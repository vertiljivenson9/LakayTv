<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vertiljivenson9/LakayTv/main/public/logo.svg">
    <img src="https://raw.githubusercontent.com/vertiljivenson9/LakayTv/main/public/logo.svg" alt="LakayTV Logo" width="120" height="120">
  </picture>
</p>

<h1 align="center">LakayTV</h1>

<p align="center">
  <strong>Plateforme de Streaming pour Contenu Haïtien</strong>
</p>

<p align="center">
  Films • Séries • Bandes-annonces en Français et Créole
</p>

<p align="center">
  <a href="#-installation">Installation</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-fonctionnalités">Fonctionnalités</a> •
  <a href="#-roadmap">Roadmap</a> •
  <a href="#-contribution">Contribution</a>
</p>

---

## À propos

LakayTV est une plateforme de streaming dédiée au contenu haïtien. "Lakay" signifie "maison" en créole haïtien, reflétant notre mission de créer un espace où le cinéma haïtien trouve sa maison.

### Pourquoi LakayTV?

Le cinéma haïtien manque de visibilité sur les plateformes internationales. LakayTV comble ce vide en offrant une plateforme spécialisée qui:

- Met en valeur les créateurs haïtiens
- Offre une qualité Full HD minimale (1080p)
- Supporte le français et le créole
- Garantit 70% des revenus aux producteurs

---

## Installation

### Prérequis

- Node.js 18+
- Bun (recommandé) ou npm
- Compte Clerk (gratuit)
- Compte Cloudflare (pour le déploiement)

### Étapes

```bash
# Cloner le repository
git clone https://github.com/vertiljivenson9/LakayTv.git
cd LakayTv

# Installer les dépendances
bun install

# Configurer les variables d'environnement
cp .env.example .env.local
```

### Variables d'environnement

Créez un fichier `.env.local` avec:

```env
# Base de données
DATABASE_URL="file:./db/custom.db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=votre_cle_publique
CLERK_SECRET_KEY=votre_cle_secrete
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/
```

### Démarrer le projet

```bash
# Initialiser la base de données
bun run db:push

# Lancer en développement
bun run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

---

## Configuration

### 1. Configurer Clerk

1. Créez un compte sur [clerk.com](https://clerk.com)
2. Créez une nouvelle application
3. Activez les providers: Email, Google, Microsoft
4. Copiez les clés dans `.env.local`

### 2. Configurer pour Cloudflare Pages

```bash
# Installer le package Cloudflare
bun add -D @cloudflare/next-on-pages

# Construire pour Cloudflare
bunx @cloudflare/next-on-pages

# Déployer
bunx wrangler pages deploy .vercel/output/static
```

### Structure du projet

```
LakayTv/
├── public/
│   └── logo.svg           # Logo LakayTV
├── src/
│   ├── app/
│   │   ├── page.tsx       # Page d'accueil
│   │   ├── layout.tsx     # Layout principal
│   │   ├── sign-in/       # Page de connexion
│   │   ├── sign-up/       # Page d'inscription
│   │   ├── watch/         # Lecteur vidéo
│   │   ├── producer/      # Panel producteur
│   │   ├── admin/         # Panel admin
│   │   └── api/           # API routes
│   ├── components/
│   │   └── ui/            # Composants shadcn/ui
│   └── lib/
│       └── db.ts          # Client Prisma
├── prisma/
│   └── schema.prisma      # Schéma de base de données
└── README.md
```

---

## Fonctionnalités

### Actuellement disponible

| Fonctionnalité | État | Description |
|---------------|------|-------------|
| Page d'accueil | ✅ | Catalogue avec films tendance |
| Authentification | ✅ | Clerk avec Google/Microsoft |
| Lecteur vidéo | ✅ | YouTube embed natif avec contrôles personnalisés |
| Panel Producteur | ✅ | Gestion de contenu |
| Panel Admin | ✅ | Modération |
| Design responsive | ✅ | Mobile-first |
| Interface FR | ✅ | Français par défaut |
| Dark theme | ✅ | Thème sombre premium |

### En développement

| Fonctionnalité | État | Description |
|---------------|------|-------------|
| Paiements | 📋 | HTG, USD, EUR |
| Souscriptions | 📋 | Plans mensuels |
| Stockage Telegram | 📋 | Alternative à YouTube |
| Statistiques | 📋 | Analytics producteurs |

### Légende

- ✅ Disponible
- 🚧 En développement
- 📋 Planifié

---

## Roadmap

### Phase 1: Prototype (Actuel)

- [x] Interface utilisateur streaming
- [x] Authentification Clerk
- [x] Catalogue de démonstration
- [x] Lecteur YouTube intégré
- [x] Panel producteur basique
- [x] Panel administrateur basique

### Phase 2: MVP

- [ ] Paiements multi-devises
- [ ] Système de souscription
- [ ] Upload de contenu
- [ ] Modération admin
- [ ] Statistiques producteurs

### Phase 3: Production

- [ ] Stockage Telegram/CDN
- [ ] DRM protection
- [ ] Application mobile
- [ ] API publique
- [ ] Analytics avancés

---

## Architecture

### Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend | Next.js 15, React 19 |
| Styling | Tailwind CSS, shadcn/ui |
| Auth | Clerk |
| Database | Prisma, SQLite |
| Déploiement | Cloudflare Pages |

### Modèle de données

```
User ──┬── Subscription
       ├── WatchHistory
       ├── Favorites
       └── Content (si producteur)

Content ──┬── Season ─── Episode
          └── Genre
```

### Modèle économique

| Acteur | Part |
|--------|------|
| Producteur | 70% |
| Plateforme | 30% |

---

## Contribution

Nous accueillons les contributions! Voici comment participer:

### 1. Fork et Clone

```bash
# Fork sur GitHub, puis:
git clone https://github.com/VOTRE_USERNAME/LakayTv.git
cd LakayTv
bun install
```

### 2. Créer une branche

```bash
git checkout -b feature/nouvelle-fonctionnalite
```

### 3. Développer

- Suivez la structure du projet
- Utilisez les composants shadcn/ui existants
- Commentez votre code en français ou anglais
- Testez sur mobile et desktop

### 4. Commit et Push

```bash
git add .
git commit -m "feat: description de la fonctionnalité"
git push origin feature/nouvelle-fonctionnalite
```

### 5. Pull Request

- Décrivez les changements
- Référencez les issues liées
- Attendez la revue

### Conventions de commit

| Type | Description |
|------|-------------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation |
| `style` | Formatage |
| `refactor` | Refactoring |
| `test` | Tests |

---

## Qualité Vidéo

LakayTV maintient des standards élevés:

| Critère | Exigence |
|---------|----------|
| Résolution minimale | 1080p (Full HD) |
| Résolution rejetée | 480p ou moins |
| Formats acceptés | MP4, MOV, MKV |
| Langues | Français, Créole, Bilingue |

---

## Sécurité

- Authentification via Clerk (OAuth 2.0)
- Middleware de protection des routes
- Variables d'environnement sécurisées
- Pas de stockage de mots de passe

---

## Support

- **Issues**: [GitHub Issues](https://github.com/vertiljivenson9/LakayTv/issues)
- **Email**: support@lakaytv.com

---

## Licence

MIT License - Voir [LICENSE](LICENSE) pour plus de détails.

---

## Équipe

Développé avec passion pour le cinéma haïtien.

---

<p align="center">
  <strong>LakayTV</strong> - La maison du cinéma haïtien
</p>

<p align="center">
  <a href="https://lakaytv.com">lakaytv.com</a>
</p>
