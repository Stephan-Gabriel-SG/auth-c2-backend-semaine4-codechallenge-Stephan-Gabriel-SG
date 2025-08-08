# 📚 API REST - Gestion de bibliothèques locales

Cette **API RESTful** permet la gestion d’un système de bibliothèques locales interconnectées, développé avec NestJS selon une architecture modulaire et évolutive.

## Fonctionnalités principales

- **Gestion des utilisateurs** : chaque utilisateur possède sa propre bibliothèque personnelle

- **Bibliothèques personnalisées** : chaque bibliothèque regroupe des livres que l’utilisateur gère

- **Emprunts partagés** : les utilisateurs peuvent consulter et emprunter des livres d’autres bibliothèques

- **Catalogue de livres** : ajout et consultation

## Structure du Projet Bibliothèque API

```bash.
├── configs/          # Fichiers de configuration (init sql DB)
├── common/           # Utilitaires partagés
├── src/              # Code source principal
│ ├── auth/           # Module des authentifications
│ ├── books/          # Module des livres
│ ├── libraries/      # Module des bibliothèques
│ ├── loans/          # Module des emprunts
│ └── users/          # Module des utilisateurs
├── .env.example      # Template des variables d'environnement
├── .gitignore        # Fichiers exclus du versioning
├── nest-cli.json     # Configuration NestJS
└── README.md         # Documentation principale
```

## Technologie Description

| Technologie               | Description                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| **NestJS**                | Framework Node.js basé sur Express avec une structure modulaire et orientée services              |
| **TypeORM**               | ORM pour gérer les entités et relations dans la base de données MySQL                             |
| **MySQL**                 | Base de données relationnelle utilisée pour stocker les utilisateurs, livres, emprunts, etc.      |
| **Bcrypt**                | Librairie pour hacher et sécuriser les mots de passe des utilisateurs                             |
| **Swagger**               | Module NestJS pour générer automatiquement la documentation API interactive et professionnelle    |
| **Passport.js**           | Middleware d'authentification pour Node.js, utilisé pour la stratégie de connexion locale et JWT. |
| **JWT (JSON Web Tokens)** | Standard de l'industrie pour créer des tokens d'accès sécurisés après l'authentification.         |

## 🛠 Installation et Configuration

### Prérequis

- **Node.js** (v18 ou supérieur)
- **MySQL** (v8 ou supérieur)
- **Git**

### 1. Installation du projet

```bash
# Cloner le dépôt
git clone https://github.com/Stephan-Gabriel-SG/auth-c2-backend-semaine4-codechallenge-Stephan-Gabriel-SG.git

# Se déplacer dans le dossier
cd c2-backend-semaine3-codechallenge-Stephan-Gabriel-SG

# Installer les dépendances
npm install
```

### 2. Configuration de la base de données

1. Initialiser la base MySQL

```shell
# Se connecter à MySQL (avec vos identifiants)
mysql -u root -p

# Initialisation de la base de données dans MySQL
# Assurez-vous de copier le chemin vers votre projet local
# puis remplacez [chemin_vers_le_project] dans la commande ci-dessous.

source [chemin_vers_le_project]/configs/init_db.sql

```

2. Configurer les variables d'environnement

```shell
  # Copier le template .env
  cp .env.example .env
```

Editez ensuite le fichier .env avec vos paramètres :

```ini
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mini_library  # Doit correspondre au nom dans init_db.sql
DB_USER=root          # Ou un utilisateur dédié
DB_PSWD=votre_mot_de_passe

JWT_SECRET=votre_jwt_secret
```

3. Lancement de l'application

```bash
# Mode développement (avec rechargement automatique)
npm run start:dev

# Ou en mode production
npm run build
npm run start:prod
```

## Documentation des Endpoints

### 1. URL principale de l’API

> L'API fonctionne par défaut à l'adresse suivante :
> [http://localhost:3000](http://localhost:3000)

### 2. Interface Swagger UI

> La documentation interactive est disponible via Swagger à :
> [http://localhost:3000/api](http://localhost:3000/api)

### 3. Auth (`/auth`)

| Méthode | Endpoint       | Description                                                 | Accès  | Paramètres                        |
| ------- | -------------- | ----------------------------------------------------------- | ------ | --------------------------------- |
| `POST`  | `/auth/login`  | Connecte un utilisateur et retourne un token JWT d'accès    | Public | Body: `{ email, password }`       |
| `POST`  | `/auth/signup` | Crée un nouvel utilisateur (mot de passe hashé avec Bcrypt) | Public | Body: `{ name, email, password }` |

### 4. Utilisateurs (`/users`)

| Méthode | Endpoint           | Description                                                 | Accès           | Paramètres                        |
| ------- | ------------------ | ----------------------------------------------------------- | --------------- | --------------------------------- |
| `POST`  | `/users`           | Crée un nouvel utilisateur (mot de passe hashé avec Bcrypt) | Public          | Body: `{ name, email, password }` |
| `GET`   | `/users`           | Liste tous les utilisateurs                                 | Admin seulement | -                                 |
| `GET`   | `/users/:id`       | Récupère un utilisateur spécifique                          | Admin seulement | Param: `id` (number)              |
| `GET`   | `/users/myloans`   | Liste des emprunts de l'utilisateur connecté                | user seulement  | -                                 |
| `GET`   | `/users/:id/loans` | Liste les emprunts d'un utilisateur                         | Admin seulement | Param: `id` (number)              |

---

Méthode Endpoint Description Accès Paramètres
POST /users Crée un nouvel utilisateur. Public Body: { name, email, password }
GET /users Liste tous les utilisateurs Admin seulement -
GET /users/:id Récupère un utilisateur spécifique Admin seulement Param: id (number)
GET /users/myloans Liste les emprunts de l'utilisateur connecté Utilisateur (Admin inclus) -
GET /users/:id/loans Liste les emprunts d'un utilisateur Admin seulement

### 5. Livres (`/books`)

| Méthode | Endpoint     | Description                     | Accès              | Paramètres                                          |
| ------- | ------------ | ------------------------------- | ------------------ | --------------------------------------------------- |
| `POST`  | `/books`     | Ajoute un nouveau livre         | Admin, Utilisateur | Body: `{ user_id, title, author, genre, [resume] }` |
| `GET`   | `/books`     | Liste les livres (filtrable)    | Public             | Query: `?author=X&genre=Y&available=true`           |
| `GET`   | `/books/:id` | Récupère les détails d'un livre | Public             | Param: `id` (number)                                |

---

### 6. Bibliothèques (`/libraries`)

| Méthode | Endpoint         | Description                             | Accès              | Paramètres                          |
| ------- | ---------------- | --------------------------------------- | ------------------ | ----------------------------------- |
| `POST`  | `/libraries`     | Crée une nouvelle bibliothèque          | Admin, Utilisateur | Body: `{ user_id, name, location }` |
| `GET`   | `/libraries`     | Liste toutes les bibliothèques          | Public             | -                                   |
| `GET`   | `/libraries/:id` | Récupère les détails d'une bibliothèque | Admin seulement    | Param: `id` (number)                |

---

### 7. Emprunts (`/loans`)

| Méthode  | Endpoint            | Description                           | Accès              | Paramètres                   |
| -------- | ------------------- | ------------------------------------- | ------------------ | ---------------------------- |
| `POST`   | `/loans`            | Crée un nouvel emprunt                | Admin, Utilisateur | Body: `{ user_id, book_id }` |
| `GET`    | `/loans`            | Liste tous les emprunts               | Admin seulement    | -                            |
| `GET`    | `/loans/:id`        | Récupère les détails d'un emprunt     | Admin seulement    | Param: `id` (number)         |
| `PATCH`  | `/loans/:id/return` | Marque un livre comme retourné        | Admin, Utilisateur | Param: `id` (number)         |
| `DELETE` | `/loans/:id`        | Supprime un emprunt (admin seulement) | Admin seulement    | Param: `id` (number)         |

---

## Auteur

**Stéphan Gabriel NANDRASANTSOA**  
Développeur Javascript & Typescript

**Compétences clés** :  
`NestJS` `TypeScript` `TypeORM` `MySQL` `API Design` `Swagger` `Architecture Logicielle` `Passport.js`

**Contribution** :  
Développement de l'API complète avec :

- Architecture modulaire
- Documentation Swagger intégrée
- Système de gestion de bibliothèque
- Sécurité des données (BCrypt)
- Validation des entrées
- Module d'authentification
