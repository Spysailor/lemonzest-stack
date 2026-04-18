#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# rollback.sh — Rollback marketplace.lemonzest.digital au commit précédent
# ------------------------------------------------------------------------------
# À exécuter SUR LE VPS.
# Revient au commit HEAD~1 et redémarre le container marketplace.
#
# Installation (une fois) :
#   ln -s /opt/lemonzest-marketplace/repo/ops/rollback.sh /usr/local/bin/deploy-marketplace-rollback
#
# Usage :
#   deploy-marketplace-rollback
# ------------------------------------------------------------------------------

set -euo pipefail

# --- Configuration ------------------------------------------------------------
REPO_DIR="/opt/lemonzest-marketplace/repo"
COMPOSE_FILE="${REPO_DIR}/ops/docker-compose.marketplace.yml"
SERVICE_NAME="marketplace-site"
DOMAIN="marketplace.lemonzest.digital"

# --- Couleurs -----------------------------------------------------------------
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

info()  { echo -e "${GREEN}▶${RESET}  $*"; }
warn()  { echo -e "${YELLOW}⚠${RESET}  $*"; }
error() { echo -e "${RED}❌${RESET} $*" >&2; }

# --- Vérifications ------------------------------------------------------------
echo ""
echo "🔙 Rollback marketplace Lemon Zest"
echo "=================================="
echo ""

[ -d "${REPO_DIR}/.git" ]   || { error "Repo Git absent dans ${REPO_DIR}"; exit 1; }
[ -f "${COMPOSE_FILE}" ]    || { error "Compose introuvable : ${COMPOSE_FILE}"; exit 1; }

cd "${REPO_DIR}"

# --- 1. Affichage du commit actuel et du précédent ---------------------------
CURRENT_SHA=$(git rev-parse --short HEAD)
CURRENT_MSG=$(git log -1 --pretty=format:"%s")
PREV_SHA=$(git rev-parse --short HEAD~1 2>/dev/null || { error "Pas de commit précédent"; exit 1; })
PREV_MSG=$(git log -1 --pretty=format:"%s" HEAD~1)

echo "  Actuel   : ${CURRENT_SHA}  ${CURRENT_MSG}"
echo "  Cible    : ${PREV_SHA}  ${PREV_MSG}"
echo ""

read -r -p "Confirmer le rollback vers ${PREV_SHA} ? [y/N] " CONFIRM
if [[ ! "${CONFIRM}" =~ ^[Yy]$ ]]; then
    warn "Annulé."
    exit 0
fi

# --- 2. Reset hard sur HEAD~1 ------------------------------------------------
info "git reset --hard HEAD~1"
git reset --hard HEAD~1
NEW_SHA=$(git rev-parse --short HEAD)

# --- 3. Restart du container -------------------------------------------------
info "docker compose restart ${SERVICE_NAME}"
docker compose -f "${COMPOSE_FILE}" restart "${SERVICE_NAME}"

# --- 4. Reload nginx (safety, au cas où la conf ait changé) ------------------
info "nginx -s reload"
sleep 3
docker compose -f "${COMPOSE_FILE}" exec -T "${SERVICE_NAME}" nginx -s reload || true

# --- 5. Vérification HTTPS ---------------------------------------------------
info "Attente stabilisation (5s)…"
sleep 5

info "curl -I https://${DOMAIN}"
curl -sSLI --max-time 15 "https://${DOMAIN}" | head -20 || true

HTTP_CODE=$(curl -sSL -o /dev/null -w "%{http_code}" --max-time 15 "https://${DOMAIN}" || echo "000")

echo ""
case "${HTTP_CODE}" in
    200|301|302)
        echo -e "${GREEN}✅ Rollback OK${RESET} — HTTP ${HTTP_CODE}"
        ;;
    *)
        error "Rollback effectué mais le site ne répond pas correctement (HTTP ${HTTP_CODE})"
        error "Logs : docker compose -f ${COMPOSE_FILE} logs --tail 50"
        exit 2
        ;;
esac

echo ""
echo "🕒 Rollback à  : $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo "🔖 SHA actif   : ${NEW_SHA}"
echo "🔗 Accessible  : https://${DOMAIN}"
echo ""
echo "💡 Pour revenir en avant : git pull puis deploy-marketplace"
echo ""
