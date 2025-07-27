<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Mini Bibliothèque API — Projet Backend NestJS

Cette API permet la gestion d'une bibliothèque numérique : utilisateurs, livres, emprunts et bibliothèques physiques. Elle est conçue avec NestJS en suivant une architecture modulaire et évolutive.

## Structure du Projet Bibliothèque API

```bash.
├── configs/          # Fichiers de configuration
├── src/              # Code source principal
│ ├── books/          # Module des livres
│ ├── common/         # Utilitaires partagés
│ ├── libraries/      # Module des bibliothèques
│ ├── loans/          # Module des emprunts
│ └── users/          # Module des utilisateurs
├── .env.example      # Template des variables d'environnement
├── .gitignore        # Fichiers exclus du versioning
├── nest-cli.json     # Configuration NestJS
└── README.md         # Documentation principale
```

## Technologie Description

| Technologie | Description                                                                                    |
| ----------- | ---------------------------------------------------------------------------------------------- |
| **NestJS**  | Framework Node.js basé sur Express avec une structure modulaire et orientée services           |
| **TypeORM** | ORM pour gérer les entités et relations dans la base de données MySQL                          |
| **MySQL**   | Base de données relationnelle utilisée pour stocker les utilisateurs, livres, emprunts, etc.   |
| **Bcrypt**  | Librairie pour hacher et sécuriser les mots de passe des utilisateurs                          |
| **Swagger** | Module NestJS pour générer automatiquement la documentation API interactive et professionnelle |

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/usdscommunity/c2-backend-semaine3-codechallenge-Stephan-Gabriel-SG.git

# Se déplacer dans le dossier
cd c2-backend-semaine3-codechallenge-Stephan-Gabriel-SG

# Installer les dépendances
npm install
```

## Configuration des variables d’environnement

> Avant de démarrer le projet, assurez-vous de configurer les variables d’environnement.

Un fichier `.env.example` est fourni à la racine du projet. Il contient les clés nécessaires pour le bon fonctionnement de l'application.

### Étapes à suivre :

1. **Duplique** le fichier `.env.example` et renomme-le `.env` :

```bash
   cp .env.example .env
```

```bash
# Démarrer le serveur en mode développement
npm run start:dev

```

## Documentation des Endpoints

### URL principale de l’API

> L'API fonctionne par défaut à l'adresse suivante :
> [http://localhost:3000](http://localhost:3000)

### Interface Swagger UI

> La documentation interactive est disponible via Swagger à :
> [http://localhost:3000/api](http://localhost:3000/api)

### Utilisateurs (`/users`)

| Méthode | Endpoint           | Description                                                 | Paramètres                        |
| ------- | ------------------ | ----------------------------------------------------------- | --------------------------------- |
| `POST`  | `/users`           | Crée un nouvel utilisateur (mot de passe hashé avec Bcrypt) | Body: `{ name, email, password }` |
| `GET`   | `/users`           | Liste tous les utilisateurs                                 | -                                 |
| `GET`   | `/users/:id`       | Récupère un utilisateur spécifique                          | Param: `id` (number)              |
| `GET`   | `/users/:id/loans` | Liste les emprunts d'un utilisateur                         | Param: `id` (number)              |

---

### Livres (`/books`)

| Méthode | Endpoint     | Description                     | Paramètres                                |
| ------- | ------------ | ------------------------------- | ----------------------------------------- |
| `POST`  | `/books`     | Ajoute un nouveau livre         | Body: `{ title, author, genre }`          |
| `GET`   | `/books`     | Liste les livres (filtrable)    | Query: `?author=X&genre=Y&available=true` |
| `GET`   | `/books/:id` | Récupère les détails d'un livre | Param: `id` (number)                      |

---

### Bibliothèques (`/libraries`)

| Méthode | Endpoint         | Description                             | Paramètres                          |
| ------- | ---------------- | --------------------------------------- | ----------------------------------- |
| `POST`  | `/libraries`     | Crée une nouvelle bibliothèque          | Body: `{ user_id ,name, location }` |
| `GET`   | `/libraries`     | Liste toutes les bibliothèques          | -                                   |
| `GET`   | `/libraries/:id` | Récupère les détails d'une bibliothèque | Param: `id` (number)                |

---

### Emprunts (`/loans`)

| Méthode  | Endpoint            | Description                           | Paramètres                   |
| -------- | ------------------- | ------------------------------------- | ---------------------------- |
| `POST`   | `/loans`            | Crée un nouvel emprunt                | Body: `{ user_id, book_id }` |
| `GET`    | `/loans`            | Liste tous les emprunts               | -                            |
| `GET`    | `/loans/:id`        | Récupère les détails d'un emprunt     | Param: `id` (number)         |
| `PATCH`  | `/loans/:id/return` | Marque un livre comme retourné        | Param: `id` (number)         |
| `DELETE` | `/loans/:id`        | Supprime un emprunt (admin seulement) | Param: `id` (number)         |

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
