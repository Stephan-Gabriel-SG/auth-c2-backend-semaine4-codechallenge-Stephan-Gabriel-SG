-- INITIALIZATION mini_library database
-- cmd : SOURCE path/init_db.sql

DROP DATABASE IF EXISTS mini_library;

CREATE DATABASE mini_library;
USE mini_library;

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE,
  `password_hash` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `libraries` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer UNIQUE,
  `name` varchar(255) NOT NULL,
  `location` varchar(255),
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `books` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `library_id` integer,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `resume` varchar(255),
  `genre` varchar(255),
  `available` bool,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE `loans` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `book_id` integer,
  `user_id` integer,
  `start_date` date,
  `end_date` date,
  `returned` bool
);

ALTER TABLE `libraries` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `books` ADD FOREIGN KEY (`library_id`) REFERENCES `libraries` (`id`);

ALTER TABLE `loans` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `loans` ADD FOREIGN KEY (`book_id`) REFERENCES `books` (`id`);

-- Insertion de 3 utilisateurs
-- Password test2025
INSERT INTO users (name, email, password_hash, created_at) VALUES
  ('Stéphan Gabriel', 'stephan@example.com', '$2b$10$yYr73V1SOxOPsyhCwxhhBe/6K8kc52xYlYWFxekMH8dJD7jnsf3WK', CURRENT_TIMESTAMP),
  ('Aina Rakoto', 'aina@example.com', '$2b$10$yYr73V1SOxOPsyhCwxhhBe/6K8kc52xYlYWFxekMH8dJD7jnsf3WK', CURRENT_TIMESTAMP),
  ('Jean Claude', 'jean@example.com', '$2b$10$yYr73V1SOxOPsyhCwxhhBe/6K8kc52xYlYWFxekMH8dJD7jnsf3WK', CURRENT_TIMESTAMP);

-- Insertion de bibliothèques (chaque user gère une seule bibliothèque)
INSERT INTO libraries (user_id, name, location, created_at) VALUES
  (1, 'Bibliothèque Centrale', 'Antsirabe', CURRENT_TIMESTAMP),
  (2, 'Espace Lecture Tana', 'Antananarivo', CURRENT_TIMESTAMP),
  (3, 'Biblio Numérique', 'Toamasina', CURRENT_TIMESTAMP);

-- Insertion de quelques livres
INSERT INTO books (library_id, title, author, resume, genre, available, created_at) VALUES
  (1, 'Le Petit Prince', 'Antoine de Saint-Exupéry', 'Conte poétique et philosophique', 'Fiction', true, CURRENT_TIMESTAMP),
  (2, 'Clean Code', 'Robert C. Martin', 'Best practices en programmation', 'Tech', true, CURRENT_TIMESTAMP),
  (3, 'L’Art de la guerre', 'Sun Tzu', 'Stratégie militaire', 'Classique', false, CURRENT_TIMESTAMP);

-- Insertion de prêts
INSERT INTO loans (book_id, user_id, start_date, end_date, returned) VALUES
  (1, 3, '2025-07-20', '2025-07-27', false),
  (2, 1, '2025-07-15', '2025-07-22', true);
