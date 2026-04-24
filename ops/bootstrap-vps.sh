#!/usr/bin/env bash
# ------------------------------------------------------------------------------
# bootstrap-vps.sh — Reprise à froid d'un VPS Ubuntu pour la stack LZD
# ------------------------------------------------------------------------------
# Usage :
#   curl -fsSL https://raw.githubusercontent.com/Spysailor/lemonzest-stack/main/ops/bootstrap-vps.sh | bash
#
# Ou en local après SSH sur le VPS :
#   ssh root@<IP>
#   bash <(curl -fsSL https://raw.githubusercontent.com/Spysailor/lemonzest-stack/main/ops/bootstrap-vps.sh)
#
# Ce script est IDEMPOTENT — on peut le rejouer autant de fois que nécessaire.
# Scénarios couverts :
#   - VPS vierge Ubuntu (22.04 / 24.04) → installe tout
#   - VPS qui a déjà Docker → skip l'install Docker, continue
#   - VPS avec Traefik déjà en place (ex: stack Hostinger pour n8n) → skip le Traefik
#     de secours, piggyback directement sur l'existant
#   - Restauration après un « Gestionnaire Docker » destructeur → re-clone + up
#
# Ce qu'il fait, dans l'ordre :
#   1. Vérifie Ubuntu / root
#   2. Installe Docker + Compose plugin si absents
#   3. Clone ou met à jour le repo dans /opt/lemonzest-marketplace/repo
#   4. Si rien n'écoute sur 443 → démarre le Traefik de secours (ops/traefik/)
#   5. Démarre (ou met à jour) le container marketplace-site
#   6. Attend le healthcheck + l'émission du cert Let's Encrypt
#   7. Affiche un rapport final
# ------------------------------------------------------------------------------

set -euo pipefail

# --- Configuration ------------------------------------------------------------
REPO_URL="${REPO_URL:-https://github.com/Spysailor/lemonzest-stack.git}"
REPO_DIR="${REPO_DIR:-/opt/lemonzest-marketplace/repo}"
DOMAIN="${DOMAIN:-marketplace.lemonzestdigital.com}"
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-hello@lemonzestdigital.com}"
MARKETPLACE_COMPOSE="${REPO_DIR}/ops/docker-compose.marketplace.yml"
TRAEFIK_COMPOSE="${REPO_DIR}/ops/traefik/docker-compose.traefik.yml"
SERVICE_NAME="marketplace-site"

# --- Couleurs + helpers -------------------------------------------------------
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
RED="\033[0;31m"
BLUE="\033[0;34m"
RESET="\033[0m"
BOLD="\033[1m"

info()  { echo -e "${GREEN}▶${RESET}  $*"; }
step()  { echo -e "\n${BLUE}${BOLD}═══ $* ═══${RESET}"; }
warn()  { echo -e "${YELLOW}⚠${RESET}  $*"; }
error() { echo -e "${RED}❌${RESET} $*" >&2; }
die()   { error "$*"; exit 1; }

# --- Pré-requis ---------------------------------------------------------------
step "1. Pré-requis"

[ "$(id -u)" = "0" ] || die "Ce script doit être lancé en root (ou via sudo)."

if [ -f /etc/os-release ]; then
  . /etc/os-release
  [ "${ID:-}" = "ubuntu" ] || warn "Distribution détectée : ${ID:-inconnue}. Ce script est testé sur Ubuntu 22.04/24.04."
else
  warn "Impossible de détecter la distribution. On continue en best-effort."
fi

info "Utilisateur : $(whoami) · Hostname : $(hostname) · Distro : ${ID:-?} ${VERSION_ID:-}"

# --- Docker -------------------------------------------------------------------
step "2. Docker + Compose plugin"

if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
  info "Docker déjà installé : $(docker --version | head -1)"
  info "Compose plugin : $(docker compose version --short 2>&1)"
else
  info "Installation de Docker via get.docker.com…"
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
  info "Docker installé : $(docker --version | head -1)"
fi

# --- Git + clone/update ------------------------------------------------------
step "3. Repo LZD"

command -v git >/dev/null 2>&1 || { info "Installation de git…"; apt-get update -qq && apt-get install -y -qq git; }

if [ -d "${REPO_DIR}/.git" ]; then
  info "Repo déjà cloné → git pull"
  git -C "${REPO_DIR}" fetch --quiet origin
  git -C "${REPO_DIR}" reset --hard origin/main --quiet
else
  info "Clone initial dans ${REPO_DIR}"
  mkdir -p "$(dirname "${REPO_DIR}")"
  git clone --quiet "${REPO_URL}" "${REPO_DIR}"
fi
info "Commit courant : $(git -C "${REPO_DIR}" log -1 --oneline)"

# --- Firewall (si ufw présent) ------------------------------------------------
step "4. Firewall (si ufw)"

if command -v ufw >/dev/null 2>&1; then
  ufw allow 22/tcp   >/dev/null 2>&1 || true
  ufw allow 80/tcp   >/dev/null 2>&1 || true
  ufw allow 443/tcp  >/dev/null 2>&1 || true
  info "ufw : 22, 80, 443 autorisés (si actif)"
else
  info "ufw non installé — skip (vérifie manuellement que 80/443 sont ouverts côté provider)"
fi

# --- Reverse proxy : Traefik de secours si aucun n'écoute sur 443 -----------
step "5. Reverse proxy (Traefik)"

if ss -tlnp 2>/dev/null | grep -qE ':(80|443)\s'; then
  listener=$(ss -tlnp 2>/dev/null | grep -E ':(80|443)\s' | head -1 | grep -oE 'users:\("[^"]+"' | head -1 | cut -d'"' -f2)
  info "Quelque chose écoute déjà sur 80/443 (${listener:-?}) → on l'utilise tel quel."
  info "Si c'est Traefik avec certresolver=letsencrypt (Hostinger ou nôtre), marketplace-site va s'enregistrer via ses labels."
else
  info "Aucun reverse proxy détecté → démarrage du Traefik de secours"
  LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL}" \
    docker compose -f "${TRAEFIK_COMPOSE}" up -d
  info "Traefik démarré (cf. ${TRAEFIK_COMPOSE})"
fi

# --- Marketplace site ---------------------------------------------------------
step "6. Container ${SERVICE_NAME}"

info "docker compose up -d…"
docker compose -f "${MARKETPLACE_COMPOSE}" up -d

# --- Attente healthy + cert Let's Encrypt ------------------------------------
step "7. Attente healthcheck + cert Let's Encrypt"

for i in $(seq 1 36); do
  sleep 5
  status=$(docker inspect "${SERVICE_NAME}" --format "{{.State.Health.Status}}" 2>/dev/null || echo "?")
  echo "  [$((i*5))s] healthcheck: ${status}"
  [ "${status}" = "healthy" ] || continue

  # Une fois le container healthy, on vérifie le cert
  issuer=$(echo | openssl s_client -connect "${DOMAIN}:443" -servername "${DOMAIN}" 2>/dev/null \
    | openssl x509 -noout -issuer 2>/dev/null || echo "")
  if echo "${issuer}" | grep -qi "Let's Encrypt"; then
    info "✓ Cert Let's Encrypt émis : ${issuer}"
    break
  fi
done

# --- Rapport final ------------------------------------------------------------
step "8. Rapport final"

echo ""
docker compose -f "${MARKETPLACE_COMPOSE}" ps
echo ""
info "Test HTTPS public :"
curl -sI "https://${DOMAIN}" 2>&1 | head -3 || warn "curl a échoué — cert peut-être encore en cours d'émission (réessayer dans 30s)"

echo ""
echo -e "${GREEN}${BOLD}─────────────────────────────────────────────────────────────${RESET}"
echo -e "${GREEN}${BOLD}  Bootstrap terminé${RESET}"
echo -e "${GREEN}${BOLD}─────────────────────────────────────────────────────────────${RESET}"
echo ""
echo "  Site      : https://${DOMAIN}"
echo "  Repo local: ${REPO_DIR}"
echo "  Commit    : $(git -C "${REPO_DIR}" log -1 --oneline)"
echo ""
echo "  Mises à jour futures :"
echo "    cd ${REPO_DIR} && git pull && docker compose -f ${MARKETPLACE_COMPOSE} restart"
echo ""
echo "  Rollback :"
echo "    bash ${REPO_DIR}/ops/rollback.sh"
echo ""
