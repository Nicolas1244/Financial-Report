# 🍽️ RestoPilot

Plateforme de gestion financière pour restaurants avec synchronisation Pennylane.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- npm ou yarn
- Un compte Supabase (gratuit)
- Optionnel : Un compte Pennylane

### Installation

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer Supabase (voir SETUP_SUPABASE.md)
# Remplissez le fichier .env.local avec vos identifiants

# 3. Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur http://localhost:5173

## 📋 Guide de configuration

**👉 [Suivez le guide Supabase pas-à-pas](./SETUP_SUPABASE.md)**

## 🏗️ Structure du projet

```
restopilot/
├── src/
│   ├── components/          # Composants réutilisables
│   ├── pages/              # Pages principales
│   │   ├── LandingPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── SignupPage.tsx
│   │   ├── Dashboard.tsx
│   │   └── ManagementAccount.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   └── client.ts   # Client Supabase
│   │   └── services/
│   │       └── pennylane.ts # Service API Pennylane
│   ├── types/
│   │   └── index.ts        # Types TypeScript
│   ├── App.tsx             # Composant principal
│   ├── main.tsx            # Point d'entrée
│   └── index.css           # Styles TailwindCSS
├── .env.example            # Template variables d'environnement
├── .env.local              # Variables d'environnement (local)
├── package.json            # Dépendances
├── tsconfig.json           # Configuration TypeScript
├── tailwind.config.js      # Configuration TailwindCSS
└── vite.config.ts          # Configuration Vite
```

## 📚 Technologies utilisées

- **Frontend** : React 19 + TypeScript
- **Build** : Vite 7
- **Backend** : Supabase (PostgreSQL + Auth)
- **API** : Pennylane (synchronisation financière)
- **Styling** : TailwindCSS
- **Routing** : react-router-dom
- **HTTP** : Axios

## 🔑 Variables d'environnement requises

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Pennylane (optionnel pour démarrer)
VITE_PENNYLANE_API_KEY=your-api-key
```

## 📖 Fonctionnalités

### Phase 1 (en cours) ✅
- ✅ Pages d'authentification (login/signup)
- ✅ Dashboard principal
- ✅ Compte de gestion (affichage des résultats)
- ✅ Intégration Supabase

### Phase 2 (À venir)
- [ ] Gestion des restaurants
- [ ] Synchronisation Pennylane
- [ ] Rapports détaillés
- [ ] Gestion des accès collaboratifs
- [ ] Export PDF/Excel
- [ ] Alertes et notifications

## 🛠️ Scripts disponibles

```bash
# Développement
npm run dev          # Démarrer le serveur de développement
npm run build        # Compiler pour la production
npm run preview      # Prévisualiser la version de production
npm run lint         # Vérifier le code (ESLint)
```

## 🔐 Sécurité

- Les identifiants Supabase ne doivent jamais être commitées
- Le fichier `.env.local` est ignoré par git
- Les clés service_role ne doivent jamais être exposées au frontend
- RLS (Row Level Security) activé sur toutes les tables

## 📞 Support & Questions

Besoin d'aide ? Consultez :
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation React](https://react.dev)
- [Documentation Vite](https://vitejs.dev)
- [Documentation Pennylane](https://api.pennylane.io)

## 📄 Licence

Propriétaire - Tous droits réservés

---

**Dernière mise à jour** : 2025
