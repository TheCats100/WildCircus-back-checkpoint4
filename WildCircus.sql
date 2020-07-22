DROP DATABASE IF EXISTS WildCircus;

CREATE DATABASE WildCircus;

USE WildCircus;

CREATE TABLE artists (
  id INT AUTO_INCREMENT PRIMARY KEY,
  profil_image VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  job VARCHAR(255) NOT NULL
);

CREATE TABLE performances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  performance_image VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255)NOT NULL,
  pseudo VARCHAR(40)NOT NULL,
  admin TINYINT(1),
  wildpoints INT(10)
);

CREATE TABLE representation (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  localisation VARCHAR(255) NOT NULL,
  date_rep DATE NOT NULL
);

CREATE TABLE users_representation (
  id INT AUTO_INCREMENT PRIMARY KEY,
  users_id INT NOT NULL,
  representation_id INT NOT NULL
);

/*--------------------------------------*/

ALTER TABLE users_representation
ADD CONSTRAINT `fk_users_representation_representation`
FOREIGN KEY (`representation_id`)
REFERENCES `representation`(`id`);

ALTER TABLE users_representation
ADD CONSTRAINT `fk_users_representation_users`
FOREIGN KEY (`users_id`)
REFERENCES `users`(`id`);

/*---------------------------------------*/

INSERT INTO representation (`id`, `localisation`, `date_rep`) VALUES (1, 'Reims', '2020-08-12'), (2, 'Paris', '2020-09-15'), (3, 'Bordeaux', '2020-11-02');

INSERT INTO performances (`id`, `title`, `description`, `performance_image`) VALUES 
(1, 'Clown', 'A clown is a comic performer who employs slapstick or similar types of physical comedy, often in a mime style.', 'https://i.pinimg.com/originals/db/44/a9/db44a987311a5383faac3e6041e277e8.jpg'), 
(2, 'Human cannonball', 'The human cannonball act is a performance in which a person who acts as the cannonball is ejected from a specially designed cannon. The human cannonball lands on a horizontal net or inflated bag placed at the landing point, as predicted by physics. Outdoor performances may aim at a body of water.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Stephanie_smith_human_cannonball_-_melbourne_show_2005.jpg/1280px-Stephanie_smith_human_cannonball_-_melbourne_show_2005.jpg');

INSERT INTO artists (`id`, `name`, `job`) VALUES (1, 'Martin G', 'Dev');