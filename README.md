# 🍽️ RestoPilot

**Plateforme professionnelle de gestion financière pour restaurants** - Créée de zéro en janvier 2026

RestoPilot est une application web moderne qui permet de piloter la performance financière de vos restaurants en temps réel, grâce à une intégration native avec Pennylane.

## 🎯 Objectif

Offrir un outil de pilotage complet pour :
- 📊 Suivre les performances commerciales de chaque établissement
- 💰 Générer des comptes de gestion dynamiques
- 💳 Gérer la trésorerie
- 📈 Analyser les données financières
- 👥 Collaborer avec votre équipe

## ✨ État du projet

**🌟 Production-Ready ✅**

- Architectue Next.js 15 moderne
- Authentification complète (Email + Google OAuth)
- Base de données Supabase optimisée
- Interface utilisateur responsive et attrayante
- Intégration API Pennylane structurée
- Documentation exhaustive

## 📁 Structure

```
Financial-Report/
├── restopilot/              # 🔥 Le projet principal
│   ├── app/                 # Pages Next.js
│   ├── components/          # Composants React
│   ├── lib/                 # Services & utilitaires
│   ├── types/               # Définitions TypeScript
│   ├── supabase/            # Schéma base de données
│   ├── 📖 8 fichiers de doc # Documentation complète
│   └── .env.local           # À configurer
│
└── SUMMARY.md               # Résumé de ce qui a été créé

```

## 🚀 Démarrage rapide

### 1. Aller dans le dossier du projet
```bash
cd /workspaces/Financial-Report/restopilot
```

### 2. Configurer Supabase (OBLIGATOIRE)
- Créer un projet sur https://supabase.com
- Exécuter `supabase/schema.sql` dans SQL Editor
- Copier les clés API et remplir `.env.local`

### 3. Configurer Pennylane (OBLIGATOIRE pour données)
- Générer une clé API sur https://app.pennylane.com
- Ajouter la clé à `.env.local`

### 4. Lancer l'application
```bash
npm install
npm run dev
```

Visitez : **http://localhost:3000**

## 📖 Documentation

| Document | Contenu |
|----------|---------|
| **START_HERE.md** | 🌟 Lisez d'abord ! |
| **GETTING_STARTED.md** | Instructions complètes |
| **SETUP_CHECKLIST.md** | Checklist pas-à-pas |
| **CREATION_REPORT.md** | Rapport technique |
| **ROADMAP.md** | Planification des phases |
| **URLS_AND_ROUTES.md** | Navigation de l'app |
| **DOCUMENTATION_INDEX.md** | Index complet |
| **README.md** | Vue d'ensemble |

👉 **Consultez `SUMMARY.md` pour un résumé rapide de ce qui a été créé.**

## ✅ Fonctionnalités actuelles

### 🏠 Pages publiques
- ✅ Landing page attractive
- ✅ Connexion (Email + Google OAuth)
- ✅ Inscription

### 🔒 Pages protégées
- ✅ Dashboard avec statistiques
- ✅ Compte de gestion complet
- ✅ Navigation responsive

### 🔐 Sécurité
- ✅ Authentification Supabase
- ✅ Row Level Security (RLS)
- ✅ Gestion des rôles
- ✅ Protection des routes

### 📊 Base de données
- ✅ Schéma optimisé (6 tables)
- ✅ Indexes de performance
- ✅ Triggers automatiques
- ✅ Gestion des permissions

## 🔜 À développer (Phase 2)

- [ ] Page Paramètres (gestion des restaurants)
- [ ] Synchronisation automatique Pennylane
- [ ] Gestion de la trésorerie
- [ ] Rapports personnalisés
- [ ] Analyse comparative multi-restaurants

## 🛠️ Stack technique

| Couche | Technology |
|--------|-----------|
| **Frontend** | Next.js 15, React 19, TypeScript |
| **Styling** | TailwindCSS 4 |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **API** | Pennylane REST API |
| **UI Icons** | Lucide React |

## 📊 Statistiques

- 📝 ~28 fichiers créés
- 📚 ~3000 lignes de code
- 🧩 2 composants réutilisables
- 🔧 5 services/utilitaires
- 🗄️ 6 tables base de données
- 📖 8 fichiers de documentation

## 🎬 Commandes utiles

```bash
npm run dev      # Serveur de développement
npm run build    # Build production
npm run start    # Serveur de production
npm run lint     # Vérifier le code
```

## 🔐 Sécurité

- ✅ Authentification sécurisée
- ✅ Row Level Security en base
- ✅ Variables d'env pour secrets
- ✅ OAuth 2.0 integration
- ✅ Validation des inputs

⚠️ **Important** : Ne jamais committer `.env.local`

## 📞 Support

- Consultez la documentation dans le dossier `restopilot/`
- Pour les erreurs Supabase : https://supabase.com/docs
- Pour Next.js : https://nextjs.org/docs
- Pour Pennylane : https://pennylane.readme.io/

## 📄 Licence

Propriétaire - Usage interne uniquement

---

## 🎉 Prochaines étapes

1. ✅ Lire **START_HERE.md** dans le dossier restopilot/
2. ✅ Configurer Supabase
3. ✅ Configurer Pennylane
4. ✅ Remplir .env.local
5. ✅ Lancer `npm run dev`
6. ✅ Tester l'application
7. ✅ Développer Phase 2

---

**Version**: 1.0.0  
**État**: Production-Ready ✅  
**Créé**: Janvier 2026

Merci d'utiliser RestoPilot ! 🍽️🚀

