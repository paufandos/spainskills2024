DROP DATABASE IF EXISTS dragon_skills;

CREATE DATABASE dragon_skills;

USE dragon_skills;

DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id CHAR(36) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(50) NOT NUll,
    administrator TINYINT(1) NOT NULL DEFAULT 0,
    points INT DEFAULT 0,
    remember_token VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT users_primary_key PRIMARY KEY(id)
);

DROP TABLE IF EXISTS tables;

CREATE TABLE tables(
    id CHAR(36) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    free TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT tables_primary_key PRIMARY KEY(id)
);

DROP TABLE IF EXISTS game;

CREATE TABLE games(
    id CHAR(36) NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    max_num_players INT NOT NULL,
    min_num_players INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT game_primary_key PRIMARY KEY(id)
);

DROP TABLE IF EXISTS reservations;

CREATE TABLE reservations(
    id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    table_id CHAR(36) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW() ON UPDATE NOW(),
    CONSTRAINT reservations_primary_key PRIMARY KEY(id),
    CONSTRAINT reservations_users_foreing_key FOREIGN KEY(user_id) REFERENCES users(id),
    CONSTRAINT reservations_tables_foreing_key FOREIGN KEY(table_id) REFERENCES tables(id)
);