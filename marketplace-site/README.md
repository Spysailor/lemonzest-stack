# 🍋 Lemon Zest Marketplace

Site de vente des skills Claude de Lemon Zest Digital.

**URL prod** : [marketplace.lemonzestdigital.com](https://marketplace.lemonzestdigital.com)

---

## 🚀 Déploiement

Hébergé sur Vercel avec déploiement automatique :
- **Push sur `main`** → déploie en prod
- **Push sur autre branche** → génère une URL preview

```bash
git push origin main
# → Vercel redéploie en 30-60s
```

---

## 🛠️ Développement local

```bash
# Servir en local
python3 -m http.server 8000

# → ouvrir http://localhost:8000
```

---

## 📁 Structure

```
lemonzest-marketplace/
├── index.html          Landing page principale
├── CLAUDE.md           Contexte projet pour Claude Code
├── vercel.json         Config Vercel (redirects, headers)
├── .gitignore
└── README.md           Ce fichier
```

---

## ✏️ Édition avec Claude Code

Le fichier `CLAUDE.md` à la racine donne tout le contexte projet à Claude Code :
charte graphique, ton éditorial, structure actuelle, workflow.

Demander à Claude Code :
- *"Ajoute une section témoignages"*
- *"Change le prix de 99 € à 129 € partout"*
- *"Ajoute 3 FAQ sur la compatibilité avec ChatGPT"*

---

## 🔗 Intégrations

- **Gumroad** (checkout) : `gumroad.com/l/marketing-agence-fr`
- **Brevo** (newsletter) : `lemonzest.digital/skill-lite`
- **Plausible Analytics** (à installer)

---

© 2026 Lemon Zest Digital
