#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# deploy.sh — Déploiement marketplace.lemonzest.digital sur le VPS Hostinger
# ------------------------------------------------------------------------------
# À exécuter SUR LE VPS (pas depuis le Mac).
# Idempotent : peut être rejoué autant de fois que nécessaire.
#
# Stratégie : bind mount read-only direct depuis le repo. Pas de rsync, pas de
# rebuild. Un `git pull` + `docker compose restart` suffit.
#
# Pré-requis une seule fois :
#   mkdir -p /opt/lemonzest-marketplace
#   cd /opt/lemonzest-marketplace
#   git clone <URL_REPO_GITHUB> repo
#   docker compose -f repo/ops/docker-compose.marketplace.yml up -d
#   ln -s /opt/lemonzest-marketplace/repo/ops/deploy.sh /usr/local/bin/deploy-marketplace
#
# Usage quotidien :
#   deploy-marketplace
# ------------------------------------------------------------------------------

set -euo pipefail

# --- Configuration ------------------------------------------------------------
REPO_DIR="/opt/lemonzest-marketplace/repo"
COMPOSE_FILE="${REPO_DIR}/ops/docker-compose.marketplace.yml"
SERVICE_NAME="marketplace-site"
DOMAIN="marketplace.lemonzest.digital"
GIT_BRANCH="main"

# --- Couleurs pour lisibilité -------------------------------------------------
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
RESET="\033[0m"

info()  { echo -e "${GREEN}▶${RESET}  $*"; }
warn()  { echo -e "${YELLOW}⚠${RESET}  $*"; }
error() { echo -e "${RED}❌${RESET} $*" >&2; }

# --- Vérifications préalables -------------------------------------------------
echo ""
echo "🍋 Déploiement marketplace Lemon Zest"
echo "======================================"
echo "  Repo    : ${REPO_DIR}"
echo "  Compose : ${COMPOSE_FILE}"
echo "  Domaine : ${DOMAIN}"
echo ""

[ -d "${REPO_DIR}/.git" ]    || { error "Repo Git absent dans ${REPO_DIR}"; exit 1; }
[ -f "${COMPOSE_FILE}" ]     || { error "Compose introuvable : ${COMPOSE_FILE}"; exit 1; }

# Sauvegarde du SHA courant (utile au cas où on veut rollback manuellement)
cd "${REPO_DIR}"
PREV_SHA=$(git rev-parse --short HEAD)
info "SHA actuel : ${PREV_SHA}"

# --- 1. Git pull (ff-only pour éviter tout merge imprévu) --------------------
info "git fetch + reset --hard origin/${GIT_BRANCH}"
git fetch origin "${GIT_BRANCH}"
git reset --hard "origin/${GIT_BRANCH}"
NEW_SHA=$(git rev-parse --short HEAD)

if [ "${PREV_SHA}" = "${NEW_SHA}" ]; then
    info "Repo déjà à jour (${NEW_SHA})."
else
    info "Passage de ${PREV_SHA} → ${NEW_SHA}"
fi

# --- 2. Docker compose : up --------------------------------------------------
# Le bind mount read-only pointant directement sur le repo, un restart suffit
# pour que nginx serve les nouveaux fichiers (nginx relit le disque à chaque req).
# On fait `up -d` plutôt que `restart` pour prendre en compte d'éventuels
# changements de compose ou de labels Traefik.
info "docker compose up -d"
docker compose -f "${COMPOSE_FILE}" up -d --remove-orphans

# --- 3. Reload nginx dans le container ---------------------------------------
# Rechargement de la config nginx (pour si nginx-marketplace.conf a changé)
# et drop du cache FS interne nginx. Sans downtime.
info "nginx -s reload dans le container"
docker compose -f "${COMPOSE_FILE}" exec -T "${SERVICE_NAME}" nginx -s reload || true

# --- 4. Logs pendant 10 secondes ---------------------------------------------
info "Logs du container (10 secondes)"
timeout 10 docker compose -f "${COMPOSE_FILE}" logs -f --tail=20 || true

# --- 5. Test HTTPS ------------------------------------------------------------
info "Attente stabilisation (5s) avant test HTTPS…"
sleep 5

info "curl https://${DOMAIN}"
HTTP_CODE=$(curl -sSL -o /dev/null -w "%{http_code}" --max-time 15 "https://${DOMAIN}" || echo "000")

case "${HTTP_CODE}" in
    200)
        echo -e "${GREEN}✅ Site en ligne${RESET} — HTTP ${HTTP_CODE}"
        ;;
    301|302)
        echo -e "${GREEN}✅ Site en ligne${RESET} — HTTP ${HTTP_CODE} (redirection)"
        ;;
    000)
        warn "Pas de réponse. DNS propagé ? Cert Let's Encrypt en cours d'émission ?"
        warn "Vérifier : docker logs traefik-traefik-1 --tail 50"
        ;;
    *)
        warn "Réponse HTTP ${HTTP_CODE}. Vérifier les logs :"
        echo "    docker compose -f ${COMPOSE_FILE} logs --tail 50"
        echo "    docker logs traefik-traefik-1 --tail 50"
        ;;
esac

# --- 6. Résumé final ----------------------------------------------------------
echo ""
echo "📦 État du container :"
docker compose -f "${COMPOSE_FILE}" ps

echo ""
echo "🕒 Déployé à    : $(date '+%Y-%m-%d %H:%M:%S %Z')"
echo "🔖 SHA déployé  : ${NEW_SHA}"
echo "🔗 Accessible   : https://${DOMAIN}"
echo ""
echo "💡 En cas de problème : deploy-marketplace-rollback"
echo ""
