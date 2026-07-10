# 🍽️ CantineApp — Kiosque de gestion de cantine scolaire

Application web Angular simulant un kiosque numérique pour la gestion de cantine scolaire.  
Projet réalisé pour démontrer mes compétences en développement Angular dans le cadre d'une candidature à un poste d'alternance.

## 🌐 Démo en ligne

> 🔗 **[cantineapp.vercel.app](https://cantine-app-blue.vercel.app)** *(à mettre à jour après déploiement)*

**Compte de test :**
- Email : `test@cantine.fr`
- Mot de passe : `test123`

---

## ✨ Fonctionnalités

- 🔐 **Authentification** — Connexion / Inscription avec JWT
- 🍽️ **Menu de la semaine** — Consultation des plats avec photos
- 🛒 **Panier & Paiement** — Ajout au panier, choix du mode de paiement
- 📋 **Réservations** — Historique et annulation
- 👤 **Mon compte** — Solde, recharge, profil

---

## 🛠️ Stack technique

### Frontend
| Technologie | Version | Rôle |
|---|---|---|
| **Angular** | 22 | Framework principal |
| **TypeScript** | 6 | Typage statique |
| **Bootstrap** | 5.3 | UI Components |
| **Bootstrap Icons** | 1.13 | Icônes |

### Backend
| Technologie | Version | Rôle |
|---|---|---|
| **Node.js / Express** | 5 | API REST |
| **MongoDB / Mongoose** | 9 | Base de données |
| **JWT** | — | Authentification |
| **bcryptjs** | — | Hachage des mots de passe |

### Patterns Angular utilisés
- ✅ Standalone Components
- ✅ Angular Router avec Lazy Loading
- ✅ AuthGuard (protection des routes)
- ✅ HTTP Interceptor (token JWT automatique)
- ✅ Services (AuthService, ApiService, ToastService)
- ✅ Interfaces TypeScript métier

---

## 🚀 Installation locale

### Prérequis
- Node.js 18+
- npm
- MongoDB (local ou Atlas)

### 1. Cloner le projet

```bash
git clone https://github.com/<ton-pseudo>/cantine-app.git
cd cantine-app
```

### 2. Lancer le backend

```bash
cd cantine-backend
npm install
cp .env.example .env
# Remplir MONGO_URI et JWT_SECRET dans .env
npm start
```

### 3. Lancer le frontend

```bash
cd cantine-app
npm install
npm start
```

> L'application sera disponible sur **http://localhost:4200**

---

## 📁 Structure du projet

```
cantine-app/                  # Frontend Angular
├── src/app/
│   ├── components/           # Composants (login, accueil, menu, reservation, compte)
│   ├── services/             # Services (auth, api, toast, panier)
│   ├── guards/               # AuthGuard
│   ├── interceptors/         # HTTP Interceptor JWT
│   ├── models/               # Interfaces TypeScript
│   └── app.routes.ts         # Routing avec lazy loading

cantine-backend/              # Backend Node.js
├── models/                   # Modèles Mongoose (Utilisateur, Menu, Reservation)
├── routes/                   # Routes Express (auth, menus, reservations, compte)
├── middleware/               # Auth middleware JWT
└── server.js                 # Point d'entrée
```

---

## 👨‍💻 Auteur

Projet réalisé par **Mohammed** dans le cadre d'une candidature alternance développeur Front-End Angular.
