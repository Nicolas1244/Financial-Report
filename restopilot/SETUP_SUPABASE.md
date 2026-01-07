# 📋 Guide Supabase : Étapes Pas-à-Pas

Suivez ce guide attentivement pour configurer Supabase et obtenir vos identifiants.

---

## ✅ Étape 1 : Créer un compte Supabase

1. Rendez-vous sur **https://supabase.com**
2. Cliquez sur **"Start your project"** ou **"Sign up"**
3. Utilisez GitHub, Google, ou créez un compte avec email
4. Vérifiez votre email si vous utilisez cette option

---

## ✅ Étape 2 : Créer un nouveau projet

1. Une fois connecté, cliquez sur **"New project"**
2. Remplissez les informations :
   - **Project name** : `restopilot` (ou le nom que vous préférez)
   - **Database Password** : Créez un mot de passe fort (vous en aurez besoin)
   - **Region** : Choisissez `France (eu-west-1)` pour la latence minimale
   - **Pricing Plan** : Sélectionnez votre plan (Free pour commencer)
3. Cliquez sur **"Create new project"**
4. ⏳ **Attendre 1-2 minutes** que le projet soit créé...

---

## ✅ Étape 3 : Récupérer vos identifiants Supabase

Une fois le projet créé :

1. Allez dans **Settings** (⚙️ en bas à gauche)
2. Cliquez sur **"API"** dans le menu de gauche
3. Vous verrez trois valeurs importantes :

   ```
   Project URL (votre_url_supabase)
   anon public (votre_clé_publique)
   service_role (votre_clé_service_role)
   ```

4. **Copiez ces trois valeurs** - vous en aurez besoin à l'étape 7

---

## ✅ Étape 4 : Créer le schéma de base de données

Votre base de données Supabase doit avoir les tables suivantes. Vous pouvez l'exécuter via l'éditeur SQL :

1. Allez dans **SQL Editor** (dans le menu de gauche)
2. Cliquez sur **"New query"**
3. Collez le code suivant :

```sql
-- Create Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT CHECK (role IN ('admin', 'manager', 'viewer')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create Restaurants table
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID REFERENCES users(id),
  address TEXT,
  phone TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create Management Account Entries
CREATE TABLE IF NOT EXISTS management_account_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  entry_date DATE NOT NULL,
  revenue DECIMAL(12, 2),
  cost_of_goods_sold DECIMAL(12, 2),
  gross_margin DECIMAL(12, 2),
  operating_expenses DECIMAL(12, 2),
  net_result DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  pennylane_id TEXT UNIQUE,
  amount DECIMAL(12, 2),
  status TEXT,
  issue_date DATE,
  created_at TIMESTAMP DEFAULT now()
);

-- Create Restaurant Access table
CREATE TABLE IF NOT EXISTS restaurant_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  restaurant_id UUID REFERENCES restaurants(id),
  role TEXT CHECK (role IN ('admin', 'manager', 'viewer')),
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS (Row Level Security)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE management_account_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurant_access ENABLE ROW LEVEL SECURITY;
```

4. Cliquez sur **"Run"** (ou Ctrl+Entrée)
5. ✅ Vous devriez voir le message "Success"

---

## ✅ Étape 5 : Configurer l'authentification Google (optionnel mais recommandé)

Si vous voulez la connexion avec Google :

1. Allez dans **Authentication** (menu de gauche)
2. Cliquez sur **"Providers"**
3. Cherchez **"Google"** et cliquez dessus
4. Vous devrez créer une application Google Cloud pour obtenir les clés
5. Consultez la doc Supabase pour cette étape si besoin

---

## ✅ Étape 6 : Copier les identifiants

Revenez dans **Settings > API** et notez les 3 valeurs suivantes :

```
VITE_SUPABASE_URL=votre_project_url
VITE_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key
```

---

## ✅ Étape 7 : Mettre à jour le fichier `.env.local`

Dans votre projet RestoPilot, ouvrez le fichier `.env.local` et remplacez les valeurs :

```env
VITE_SUPABASE_URL=https://votre-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=votre_clé_anon_très_longue_ici
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_role_très_longue_ici
VITE_PENNYLANE_API_KEY=votre_clé_pennylane_ici
```

**⚠️ Attention** : Ne commitez jamais ce fichier en git. Il est déjà dans `.gitignore`.

---

## ✅ Étape 8 : Démarrer l'application

Dans le terminal, exécutez :

```bash
npm run dev
```

Vous devriez voir :
```
> vite
  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

Ouvrez http://localhost:5173 dans votre navigateur ! 🚀

---

## ✅ Étape 9 : Tester l'authentification

1. Cliquez sur **"Commencer"** ou allez à `/signup`
2. Créez un compte avec votre email
3. Vous devriez recevoir un email de confirmation (vérifiez les spams)
4. Cliquez sur le lien de confirmation
5. Retournez à l'app et connectez-vous
6. Vous devriez arriver au dashboard ! ✅

---

## 🔑 Cheat Sheet : Où trouver chaque valeur

| Variable | Où la trouver | Format |
|----------|---|---|
| `VITE_SUPABASE_URL` | Settings > API > Project URL | `https://xxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Settings > API > anon public | Clé longue commençant par `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Settings > API > service_role | Clé longue commençant par `eyJ...` |
| `VITE_PENNYLANE_API_KEY` | Votre compte Pennylane > Paramètres > API | Clé fournie par Pennylane |

---

## ❓ Questions fréquentes

**Q: Où je trouve ma clé Pennylane ?**  
R: Connectez-vous à votre compte Pennylane > Paramètres ou Intégrations > API Keys

**Q: Je n'ai pas reçu l'email de confirmation Supabase**  
R: Vérifiez les spams. Si rien, retournez au login et cliquez "Je n'ai pas reçu l'email"

**Q: L'app dit "identifiants manquants"**  
R: Vérifiez que votre `.env.local` contient TOUS les identifiants sans espaces

**Q: Je veux tester sans Pennylane pour le moment**  
R: C'est OK ! Laissez `VITE_PENNYLANE_API_KEY=test` pour maintenant

---

## 🎯 C'est bon ? Passons à la suite !

Une fois que vous avez :
- ✅ Créé un compte Supabase
- ✅ Créé un projet
- ✅ Exécuté le schéma SQL
- ✅ Rempli le `.env.local`
- ✅ L'app démarre avec `npm run dev`

**Dites-moi !** Je peux vous aider avec :
- Ajouter vos premiers restaurants
- Connecter Pennylane
- Créer les autres pages
- Déployer l'app
