# 🚀 Livraison Kiosk

Une interface tactile professionnelle pour livraison rapide de pièces détachées en autonomie.
Pensée pour tablettes type borne, avec fond visuel flouté, sécurité admin, et envoi automatique de confirmation par e-mail ✉️.

---

## 🖥️ Technologies utilisées

- ⚡️ [Vite](https://vitejs.dev/) + [React 19](https://react.dev/)
- 🎨 [Tailwind CSS 3.4.2](https://tailwindcss.com/)
- 📬 [Resend](https://resend.com/) pour l’envoi des e-mails
- 📁 TypeScript + Structure modulaire propre
- 🌐 Déployé sur [Vercel](https://vercel.com/)

---

## 📦 Fonctionnalités principales

- 🔍 Recherche floue (libellé, référence, machine)
- 🖱️ Ajout rapide d'articles à livrer
- ✅ Validation de livraison avec date/heure
- ✉️ Envoi automatique d’un récap par e-mail
- 🔒 Mode borne sécurisé (pas d’Alt+Tab, F12, clic droit)
- 🧑‍🔧 Déverrouillage admin par code secret

---

## 📁 Arborescence

```
📁 livraison-kiosk
├── api/                → Route API Resend
│   └── sendEmail.ts
├── public/             → Fond flouté, assets
├── src/
│   ├── composants/     → Composants réutilisables
│   ├── pages/          → Pages : Livraison, Catalogue
│   ├── data/           → articles.json
│   ├── layouts/        → Layouts stylés
│   └── services/       → Fonctions d’envoi email
└── .env.example        → Variables d’environnement
```

---

## 🔐 Variables d’environnement

```
# .env.example
VITE_RESEND_API_KEY=ta_clé_API_resend
```

---

## ✅ Lancer le projet en local

```bash
npm install
npm run dev
```

---

## 🛰️ Déploiement Vercel

- Push vers GitHub
- Connecte ton repo sur [vercel.com](https://vercel.com/)
- Ajoute `RESEND_API_KEY` dans les variables Vercel
- Deploy 🎉

---

## 🤝 Contributeurs

- 🧠 Code & UI : [@Masterjeremysu](https://github.com/Masterjeremysu)

---

## 📄 Licence

MIT © Masterjeremysu
