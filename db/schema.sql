DROP DATABASE if exists burgers_db;
CREATE DATABASE burgers_db;
USE burgers_db;

CREATE TABLE burgers
(
	id INTEGER AUTO_INCREMENT NOT NULL,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (id)
);