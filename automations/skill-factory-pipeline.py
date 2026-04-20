#!/usr/bin/env python3
"""
Skill Factory Pipeline — Lemon Zest Digital
============================================
Automatise la francisation de skills Claude EN → FR + packaging marketplace.

Pipeline (6 étapes) :
  1. Lit la base Notion "Skills Curator" et filtre les candidats prioritaires
  2. Clone chaque repo GitHub et extrait le SKILL.md EN
  3. Appelle l'API Claude avec le skill-fr-factory comme system prompt
  4. Parse la réponse et écrit SKILL.md FR + README + fiches + ZIP
  5. Met à jour Notion (Status → Done, Summary FR)
  6. Envoie un rapport Telegram

Usage :
  python skill-factory-pipeline.py              # Top 10 (mode réel)
  python skill-factory-pipeline.py --dry-run    # Simulation
  python skill-factory-pipeline.py --limit 3    # N skills
  python skill-factory-pipeline.py --skill NOM  # 1 skill précis
"""
from __future__ import annotations

import argparse
import json
import logging
import os
import re
import shutil
import subprocess
import sys
import time
import zipfile
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Any

import requests
from dotenv import load_dotenv

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

ROOT = Path(__file__).resolve().parent.parent  # ~/lemonzest-stack/
# override=True : le .env local fait autorité sur les variables shell existantes
# (évite qu'un ancien ANTHROPIC_API_KEY dans ~/.zshrc masque la vraie valeur)
load_dotenv(ROOT / ".env", override=True)

# Clés API
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "").strip()
NOTION_TOKEN = os.getenv("NOTION_TOKEN", "").strip()
NOTION_SKILLS_DB = os.getenv(
    "NOTION_SKILLS_DB",
    os.getenv("NOTION_DB_ID_SKILLS_CURATOR", "cef22f99-a641-4891-a936-689cec871c3f"),
).strip()
NOTION_PRODUCTS_DB = os.getenv("NOTION_PRODUCTS_DB", "").strip()
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "").strip()
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "").strip()

# Chemins
SKILLS_OUTPUT_DIR = Path(
    os.path.expanduser(os.getenv("SKILLS_OUTPUT_DIR", str(ROOT / "skills")))
)
ZIPS_OUTPUT_DIR = Path(
    os.path.expanduser(os.getenv("ZIPS_OUTPUT_DIR", str(ROOT / "zips")))
)
LOGS_DIR = Path(
    os.path.expanduser(os.getenv("LOGS_DIR", str(ROOT / "logs")))
)
SKILL_FACTORY_PATH = Path(
    os.path.expanduser(
        os.getenv("SKILL_FACTORY_PATH", "~/.claude/skills/skill-fr-factory/SKILL.md")
    )
)
ADAPTATIONS_PATH = SKILL_FACTORY_PATH.parent / "references" / "adaptations-fr.md"

# Paramètres API / pipeline
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-5-20250929")
CLAUDE_MAX_TOKENS = int(os.getenv("CLAUDE_MAX_TOKENS", "8000"))
RATE_LIMIT_SECONDS = int(os.getenv("RATE_LIMIT_SECONDS", "30"))
DEFAULT_LIMIT = 10

NOTION_API_BASE = "https://api.notion.com/v1"
NOTION_VERSION = "2022-06-28"
ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages"

# Opportunity values qui déclenchent le traitement
OPPORTUNITY_ACCEPT = {"🔥 10 - Must do", "⭐ 8-9 - High"}
STATUS_ACCEPT = {"🆕 New", "👀 Reviewed"}
RECO_ACCEPT = {"TRANSLATE", "INSPIRE"}

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

LOGS_DIR.mkdir(parents=True, exist_ok=True)
log_file = LOGS_DIR / f"skill-factory-{datetime.now():%Y%m%d-%H%M%S}.log"

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(log_file, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger("skill-factory")


# ---------------------------------------------------------------------------
# Modèles
# ---------------------------------------------------------------------------

@dataclass
class Skill:
    """Un skill lu depuis Notion."""
    page_id: str
    name: str
    github_url: str
    niche: str = ""
    opportunity: str = ""
    status: str = ""
    recommendation: str = ""
    priority: float = 0.0
    complexity: str = ""
    raw_properties: dict = field(default_factory=dict)

    @property
    def slug(self) -> str:
        s = self.name.lower().strip()
        s = re.sub(r"[^a-z0-9]+", "-", s)
        s = s.strip("-")
        return s

    def suggested_price(self) -> int:
        """Prix suggéré en € selon complexité."""
        c = (self.complexity or "").lower()
        if "high" in c or "élevé" in c:
            return 149
        if "medium" in c or "moyen" in c:
            return 99
        return 49


# ---------------------------------------------------------------------------
# Notion helpers
# ---------------------------------------------------------------------------

def notion_headers() -> dict[str, str]:
    if not NOTION_TOKEN:
        raise RuntimeError(
            "NOTION_TOKEN manquant dans .env — impossible d'interroger Notion."
        )
    return {
        "Authorization": f"Bearer {NOTION_TOKEN}",
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
    }


def notion_get_property(props: dict, name: str) -> Any:
    """Extrait une valeur d'une propriété Notion, quelle que soit son type."""
    prop = props.get(name)
    if not prop:
        return None
    t = prop.get("type")
    if t == "title":
        return "".join(x.get("plain_text", "") for x in prop.get("title", []))
    if t == "rich_text":
        return "".join(x.get("plain_text", "") for x in prop.get("rich_text", []))
    if t == "select":
        sel = prop.get("select")
        return sel.get("name") if sel else None
    if t == "multi_select":
        return [x.get("name") for x in prop.get("multi_select", [])]
    if t == "status":
        st = prop.get("status")
        return st.get("name") if st else None
    if t == "number":
        return prop.get("number")
    if t == "url":
        return prop.get("url")
    if t == "checkbox":
        return prop.get("checkbox")
    if t == "date":
        d = prop.get("date")
        return d.get("start") if d else None
    return None


def notion_query_skills() -> list[Skill]:
    """Interroge la base Skills Curator et retourne les candidats."""
    url = f"{NOTION_API_BASE}/databases/{NOTION_SKILLS_DB}/query"
    skills: list[Skill] = []
    start_cursor: str | None = None

    while True:
        payload: dict = {"page_size": 100}
        if start_cursor:
            payload["start_cursor"] = start_cursor

        r = requests.post(url, headers=notion_headers(), json=payload, timeout=30)
        if r.status_code != 200:
            raise RuntimeError(f"Notion query échoué: {r.status_code} {r.text[:400]}")
        data = r.json()

        for page in data.get("results", []):
            props = page.get("properties", {})
            name = (
                notion_get_property(props, "Skill Name")
                or notion_get_property(props, "Name")
                or notion_get_property(props, "Title")
                or notion_get_property(props, "Skill")
                or ""
            )
            if not name:
                continue
            gh = (
                notion_get_property(props, "GitHub URL")
                or notion_get_property(props, "GitHub")
                or notion_get_property(props, "URL")
                or ""
            )
            skill = Skill(
                page_id=page["id"],
                name=name.strip(),
                github_url=(gh or "").strip(),
                niche=notion_get_property(props, "Niche") or "",
                opportunity=notion_get_property(props, "FR Opportunity") or "",
                status=notion_get_property(props, "Status") or "",
                recommendation=notion_get_property(props, "Recommendation") or "",
                priority=notion_get_property(props, "Priority") or 0,
                complexity=notion_get_property(props, "Complexity") or "",
                raw_properties=props,
            )
            skills.append(skill)

        if not data.get("has_more"):
            break
        start_cursor = data.get("next_cursor")

    # Filtrage côté client (plus tolérant que les filters Notion si les noms diffèrent)
    def matches(s: Skill) -> bool:
        if s.opportunity not in OPPORTUNITY_ACCEPT:
            return False
        if s.status not in STATUS_ACCEPT:
            return False
        if (s.recommendation or "").upper() not in RECO_ACCEPT:
            return False
        return True

    filtered = [s for s in skills if matches(s)]
    filtered.sort(key=lambda s: (-(s.priority or 0), s.name))
    return filtered


def notion_update_skill_done(skill: Skill, summary_fr: str) -> None:
    """Met à jour le skill dans Notion : Status → Done + Summary FR."""
    url = f"{NOTION_API_BASE}/pages/{skill.page_id}"
    # Détecte si Status est type "status" ou "select"
    status_prop_type = (
        skill.raw_properties.get("Status", {}).get("type") or "status"
    )
    status_value = (
        {"status": {"name": "✅ Done"}}
        if status_prop_type == "status"
        else {"select": {"name": "✅ Done"}}
    )
    props: dict = {"Status": status_value}
    if summary_fr:
        props["Summary FR"] = {
            "rich_text": [{"text": {"content": summary_fr[:1900]}}]
        }
    r = requests.patch(
        url, headers=notion_headers(), json={"properties": props}, timeout=30
    )
    if r.status_code >= 300:
        log.warning("Notion update warning (%s): %s", r.status_code, r.text[:200])


# ---------------------------------------------------------------------------
# GitHub / filesystem helpers
# ---------------------------------------------------------------------------

def clone_repo(github_url: str, dest: Path) -> Path:
    if dest.exists():
        shutil.rmtree(dest)
    log.info("  git clone %s → %s", github_url, dest)
    subprocess.run(
        ["git", "clone", "--depth", "1", github_url, str(dest)],
        check=True,
        capture_output=True,
    )
    return dest


def find_skill_md(repo_path: Path) -> Path | None:
    """Cherche le SKILL.md principal : racine → /skills/ → récursif."""
    candidates = [
        repo_path / "SKILL.md",
        repo_path / "skills" / "SKILL.md",
    ]
    for c in candidates:
        if c.is_file():
            return c
    matches = list(repo_path.rglob("SKILL.md"))
    if not matches:
        return None
    # Préférer le moins profond
    matches.sort(key=lambda p: (len(p.parts), len(str(p))))
    return matches[0]


# ---------------------------------------------------------------------------
# Anthropic API
# ---------------------------------------------------------------------------

def load_system_prompt() -> str:
    if not SKILL_FACTORY_PATH.is_file():
        raise RuntimeError(
            f"skill-fr-factory introuvable: {SKILL_FACTORY_PATH}"
        )
    parts = [SKILL_FACTORY_PATH.read_text(encoding="utf-8")]
    if ADAPTATIONS_PATH.is_file():
        parts.append("\n\n---\n\n# Annexe : adaptations FR\n\n")
        parts.append(ADAPTATIONS_PATH.read_text(encoding="utf-8"))
    return "".join(parts)


def call_claude(system: str, user_msg: str) -> str:
    if not ANTHROPIC_API_KEY:
        raise RuntimeError("ANTHROPIC_API_KEY manquant dans .env.")
    headers = {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
    payload = {
        "model": CLAUDE_MODEL,
        "max_tokens": CLAUDE_MAX_TOKENS,
        "system": system,
        "messages": [{"role": "user", "content": user_msg}],
    }
    r = requests.post(ANTHROPIC_API_URL, headers=headers, json=payload, timeout=300)
    if r.status_code != 200:
        raise RuntimeError(f"Anthropic API {r.status_code}: {r.text[:600]}")
    data = r.json()
    return "".join(
        block.get("text", "")
        for block in data.get("content", [])
        if block.get("type") == "text"
    )


# ---------------------------------------------------------------------------
# Parsing de la réponse Claude
# ---------------------------------------------------------------------------

# Les blocs attendus sont délimités par des fences de code Markdown sous
# des en-têtes explicites. Le skill-fr-factory peut aussi produire du JSON
# (fiche marketplace). On tente plusieurs stratégies.

SECTION_PATTERNS = {
    "skill_md": [
        r"#{1,4}\s*SKILL\.md FR.*?\n+```(?:markdown|md)?\n(.*?)\n```",
        r"(?:^|\n)##+\s*SKILL\.md[^\n]*\n+```(?:markdown|md)?\n(.*?)\n```",
        r"```markdown\n(---\nname:.*?)\n```",
    ],
    "readme": [
        r"#{1,4}\s*README(?:\.md)?(?: client)?.*?\n+```(?:markdown|md)?\n(.*?)\n```",
    ],
    "fiche_gumroad": [
        r"#{1,4}\s*[Ff]iche Gumroad.*?\n+```(?:markdown|md)?\n(.*?)\n```",
    ],
    "fiche_marketplace": [
        r"#{1,4}\s*[Ff]iche [Mm]arketplace.*?\n+```(?:json)\n(.*?)\n```",
    ],
}


def extract_section(text: str, key: str) -> str | None:
    for pat in SECTION_PATTERNS[key]:
        m = re.search(pat, text, re.DOTALL | re.IGNORECASE)
        if m:
            return m.group(1).strip()
    return None


def parse_claude_response(text: str) -> dict[str, str]:
    """Extrait les blocs structurés de la réponse."""
    return {
        "skill_md": extract_section(text, "skill_md") or "",
        "readme": extract_section(text, "readme") or "",
        "fiche_gumroad": extract_section(text, "fiche_gumroad") or "",
        "fiche_marketplace": extract_section(text, "fiche_marketplace") or "",
        "raw": text,
    }


# ---------------------------------------------------------------------------
# Sauvegarde des livrables
# ---------------------------------------------------------------------------

def save_skill_outputs(skill: Skill, parsed: dict[str, str]) -> Path:
    folder_name = f"{skill.slug}-fr"
    out_dir = SKILLS_OUTPUT_DIR / folder_name
    out_dir.mkdir(parents=True, exist_ok=True)

    if parsed["skill_md"]:
        (out_dir / "SKILL.md").write_text(parsed["skill_md"], encoding="utf-8")
    if parsed["readme"]:
        (out_dir / "README.md").write_text(parsed["readme"], encoding="utf-8")

    # Dépot de la réponse brute pour audit/debug
    (out_dir / ".claude-response.md").write_text(parsed["raw"], encoding="utf-8")

    # Fiches séparées (à la racine automations/fiches/ pour accès rapide)
    if parsed["fiche_gumroad"]:
        (out_dir / f"fiche-gumroad-{skill.slug}.md").write_text(
            parsed["fiche_gumroad"], encoding="utf-8"
        )
    if parsed["fiche_marketplace"]:
        (out_dir / f"fiche-marketplace-{skill.slug}.json").write_text(
            parsed["fiche_marketplace"], encoding="utf-8"
        )

    # ZIP
    ZIPS_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    zip_path = ZIPS_OUTPUT_DIR / f"{folder_name}-v1.0.zip"
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for p in out_dir.rglob("*"):
            if p.is_file() and not p.name.startswith(".claude-response"):
                zf.write(p, p.relative_to(out_dir.parent))
    log.info("  ✅ ZIP: %s (%.1f KB)", zip_path, zip_path.stat().st_size / 1024)

    return out_dir


# ---------------------------------------------------------------------------
# Telegram
# ---------------------------------------------------------------------------

def telegram_send(message: str) -> None:
    if not (TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID):
        log.info("(Telegram non configuré, rapport local uniquement)")
        return
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    try:
        r = requests.post(
            url,
            json={
                "chat_id": TELEGRAM_CHAT_ID,
                "text": message[:4000],
                "parse_mode": "Markdown",
                "disable_web_page_preview": True,
            },
            timeout=15,
        )
        if r.status_code != 200:
            log.warning("Telegram %s: %s", r.status_code, r.text[:200])
    except Exception as e:
        log.warning("Telegram envoi raté: %s", e)


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def process_skill(skill: Skill, system_prompt: str, dry_run: bool) -> dict:
    """Traite un skill. Retourne {status, error?, out_dir?}."""
    log.info("➡️  [%s] (%s — priority=%s)", skill.name, skill.niche, skill.priority)

    if not skill.github_url:
        return {"status": "error", "error": "GitHub URL manquant dans Notion"}

    if dry_run:
        log.info("  [DRY-RUN] aurait cloné %s", skill.github_url)
        log.info("  [DRY-RUN] aurait appelé Claude (%s)", CLAUDE_MODEL)
        log.info("  [DRY-RUN] aurait écrit %s/%s-fr/",
                 SKILLS_OUTPUT_DIR, skill.slug)
        return {"status": "dry-run"}

    tmp = Path("/tmp") / f"skill-source-{skill.slug}"
    try:
        clone_repo(skill.github_url, tmp)
    except subprocess.CalledProcessError as e:
        stderr = (e.stderr or b"").decode(errors="replace")[:300]
        return {"status": "error", "error": f"git clone: {stderr}"}

    skill_md_path = find_skill_md(tmp)
    if not skill_md_path:
        return {"status": "error", "error": "SKILL.md introuvable dans le repo"}
    skill_md_en = skill_md_path.read_text(encoding="utf-8", errors="replace")
    log.info("  SKILL.md EN trouvé: %s (%d chars)",
             skill_md_path.relative_to(tmp), len(skill_md_en))

    user_msg = (
        f"Francise ce skill EN pour la marketplace Lemon Zest Digital.\n\n"
        f"**Skill source :**\n```markdown\n{skill_md_en}\n```\n\n"
        f"**Contexte :**\n"
        f"- Marché cible : FR / BE / CH / MU\n"
        f"- Niche : {skill.niche or 'Générique'}\n"
        f"- Prix suggéré : {skill.suggested_price()} €\n"
        f"- Recommendation Notion : {skill.recommendation}\n\n"
        f"**Instructions critiques :**\n"
        f"1. Tu as déjà le pipeline 8 étapes en system prompt. NE LE RECOPIE PAS.\n"
        f"2. Exécute mentalement les Étapes 1-2-4 (analyse/mapping/qualité) SANS les écrire.\n"
        f"3. Tu DOIS produire les 4 livrables ci-dessous, dans cet ordre, "
        f"chacun précédé du header `## ` (deux dièses) exact indiqué, avec une "
        f"fence de code juste après. Ne saute AUCUN des 4 blocs. Rien d'autre.\n\n"
        f"## SKILL.md FR\n"
        f"```markdown\n<SKILL.md FR complet, prêt à l'emploi, frontmatter YAML inclus>\n```\n\n"
        f"## README client\n"
        f"```markdown\n<README 1-2 pages : installation Claude.ai+Code+ChatGPT, "
        f"compatibilité, conformité, support, garantie 14j>\n```\n\n"
        f"## Fiche Gumroad\n"
        f"```markdown\n<Titre produit + description vente : hook, problème, "
        f"bullets bénéfices, ROI chiffré, prix {skill.suggested_price()}€, garantie>\n```\n\n"
        f"## Fiche marketplace\n"
        f"```json\n{{\"nom\": \"...\", \"slug\": \"{skill.slug}-fr\", "
        f"\"categorie\": \"{skill.niche}\", "
        f"\"prix\": {skill.suggested_price()}, \"statut\": \"disponible\", "
        f"\"description_courte\": \"...\", \"bullets\": [\"...\", \"...\", \"...\"]}}\n```\n"
    )

    try:
        response = call_claude(system_prompt, user_msg)
    except Exception as e:
        return {"status": "error", "error": f"Claude API: {e}"}

    parsed = parse_claude_response(response)
    if not parsed["skill_md"]:
        return {"status": "error", "error": "SKILL.md FR non détecté dans la réponse"}

    out_dir = save_skill_outputs(skill, parsed)

    # Summary FR pour Notion : première ligne non vide après le H1
    summary = ""
    for line in parsed["skill_md"].splitlines():
        s = line.strip()
        if s and not s.startswith(("#", "-", "*", "`", "<")):
            summary = s
            break

    try:
        notion_update_skill_done(skill, summary)
        log.info("  ✅ Notion mis à jour")
    except Exception as e:
        log.warning("  Notion update raté: %s", e)

    # Nettoyage
    shutil.rmtree(tmp, ignore_errors=True)

    return {"status": "ok", "out_dir": str(out_dir)}


def build_report(results: list[tuple[Skill, dict]], remaining: int) -> str:
    ok = [s for s, r in results if r["status"] == "ok"]
    errors = [(s, r) for s, r in results if r["status"] == "error"]
    dry = [s for s, r in results if r["status"] == "dry-run"]

    lines = ["# 🍋 Skill Factory — Rapport"]
    lines.append(f"**Date** : {datetime.now():%Y-%m-%d %H:%M}")
    lines.append(f"**Traités** : {len(results)}")
    lines.append(f"**Succès** : {len(ok)}")
    lines.append(f"**Erreurs** : {len(errors)}")
    if dry:
        lines.append(f"**Dry-run** : {len(dry)}")
    lines.append(f"**En attente** : {remaining}")
    lines.append("")

    if ok:
        lines.append("## ✅ Générés")
        for s, r in [(s, r) for s, r in results if r["status"] == "ok"]:
            lines.append(f"- **{s.name}** → `{r.get('out_dir')}`")
        lines.append("")

    if errors:
        lines.append("## ❌ Erreurs")
        for s, r in errors:
            lines.append(f"- **{s.name}** : {r.get('error')}")
        lines.append("")

    if dry:
        lines.append("## 🧪 Dry-run (non exécuté)")
        for s in dry:
            lines.append(
                f"- **{s.name}** — {s.niche or '—'} — opp={s.opportunity} — "
                f"reco={s.recommendation} — prio={s.priority} — "
                f"prix={s.suggested_price()}€ — {s.github_url or '⚠️ pas de repo'}"
            )

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def preflight(dry_run: bool) -> list[str]:
    """Vérifie les prérequis et retourne la liste des problèmes."""
    issues: list[str] = []
    if not SKILL_FACTORY_PATH.is_file():
        issues.append(f"SKILL_FACTORY_PATH introuvable : {SKILL_FACTORY_PATH}")
    if not NOTION_TOKEN:
        issues.append("NOTION_TOKEN manquant dans .env")
    if not dry_run and not ANTHROPIC_API_KEY:
        issues.append("ANTHROPIC_API_KEY manquant dans .env (requis hors --dry-run)")
    if not shutil.which("git"):
        issues.append("git introuvable dans le PATH")
    return issues


def main() -> int:
    ap = argparse.ArgumentParser(description="Skill Factory Pipeline")
    ap.add_argument("--dry-run", action="store_true",
                    help="Simulation sans appel API Claude ni écriture")
    ap.add_argument("--limit", type=int, default=DEFAULT_LIMIT,
                    help=f"Nombre max de skills (défaut: {DEFAULT_LIMIT})")
    ap.add_argument("--skill", type=str, default=None,
                    help="Nom exact d'un skill à traiter (ignore les filtres)")
    ap.add_argument("--no-telegram", action="store_true",
                    help="Ne pas envoyer le rapport Telegram")
    args = ap.parse_args()

    log.info("=" * 60)
    log.info("🍋 Skill Factory Pipeline — %s",
             "DRY-RUN" if args.dry_run else "LIVE")
    log.info("Log file: %s", log_file)
    log.info("=" * 60)

    issues = preflight(args.dry_run)
    if issues:
        for i in issues:
            log.error("❌ %s", i)
        blocking = any(
            kw in i
            for i in issues
            for kw in ("NOTION_TOKEN", "SKILL_FACTORY", "ANTHROPIC_API_KEY", "git")
        )
        if blocking:
            return 2

    # Étape 1 : lecture Notion
    log.info("📥 Lecture Notion (base %s)…", NOTION_SKILLS_DB)
    try:
        all_skills = notion_query_skills()
    except Exception as e:
        log.error("Notion query raté: %s", e)
        return 3
    log.info("   %d skills candidats après filtrage", len(all_skills))

    # Filtre éventuel sur --skill
    if args.skill:
        needle = args.skill.lower()
        matches = [s for s in all_skills if needle in s.name.lower()]
        if not matches:
            log.error("Aucun skill trouvé correspondant à '%s'", args.skill)
            return 4
        if len(matches) > 1:
            log.info("   %d matchs pour '%s', le premier est retenu :",
                     len(matches), args.skill)
            for m in matches[:5]:
                log.info("     • %s", m.name)
        selected = matches[:1]
    else:
        selected = all_skills[: args.limit]

    remaining = max(0, len(all_skills) - len(selected))

    # Affichage du plan
    log.info("📋 Plan d'exécution (%d skill(s)) :", len(selected))
    for i, s in enumerate(selected, 1):
        log.info("  %2d. %s  [opp=%s | reco=%s | prio=%s | %d€]",
                 i, s.name, s.opportunity, s.recommendation,
                 s.priority, s.suggested_price())
        if s.github_url:
            log.info("      %s", s.github_url)
        else:
            log.info("      ⚠️  GitHub URL manquant")

    if args.dry_run:
        results = [(s, {"status": "dry-run"}) for s in selected]
        report = build_report(results, remaining)
        print("\n" + report)
        (LOGS_DIR / "last-dry-run.md").write_text(report, encoding="utf-8")
        log.info("✅ Dry-run terminé. Rapport: %s", LOGS_DIR / "last-dry-run.md")
        return 0

    # Étape 2-5 : exécution
    system_prompt = load_system_prompt()
    log.info("   System prompt: %d chars", len(system_prompt))

    results: list[tuple[Skill, dict]] = []
    for i, skill in enumerate(selected, 1):
        log.info("── [%d/%d] ───────────────────────────────", i, len(selected))
        try:
            r = process_skill(skill, system_prompt, dry_run=False)
        except Exception as e:
            r = {"status": "error", "error": f"Exception: {e}"}
        results.append((skill, r))
        log.info("   → %s", r.get("status"))

        if i < len(selected):
            log.info("   ⏳ rate-limit %ds…", RATE_LIMIT_SECONDS)
            time.sleep(RATE_LIMIT_SECONDS)

    # Étape 6 : rapport
    report = build_report(results, remaining)
    report_path = LOGS_DIR / f"report-{datetime.now():%Y%m%d-%H%M%S}.md"
    report_path.write_text(report, encoding="utf-8")
    log.info("📝 Rapport: %s", report_path)
    print("\n" + report)

    if not args.no_telegram:
        telegram_send(report)

    ok_count = sum(1 for _, r in results if r["status"] == "ok")
    return 0 if ok_count == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
