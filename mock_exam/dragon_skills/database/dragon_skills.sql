DROP DATABASE IF EXISTS dragon_skills;
CREATE DATABASE dragon_skills;

USE dragon_skills;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
	user_id CHAR(36) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    administrator TINYINT(1) NOT NULL DEFAULT 0,
    points INT DEFAULT 0,
    CONSTRAINT users_primary_key PRIMARY KEY(user_id)
);

DELIMITER ;;
CREATE TRIGGER create_user_uuid
BEFORE INSERT ON users FOR EACH ROW
BEGIN
	IF new.user_id IS NULL THEN
		SET new.user_id = uuid();
	END IF;
END;;
DELIMITER ;

DROP TABLE IF EXISTS tables;
CREATE TABLE tables(
	table_id CHAR(36) NOT NULL,
    width INT NOT NULL,
    height INT NOT NULL,
    free TINYINT(1) DEFAULT 1,
    CONSTRAINT tables_primary_key PRIMARY KEY(table_id)
);

DELIMITER ;;
CREATE TRIGGER create_table_uuid
BEFORE INSERT ON tables FOR EACH ROW
BEGIN
	IF new.table_id IS NULL THEN
		SET new.table_id = uuid();
	END IF;
END;;
DELIMITER ;

DROP TABLE IF EXISTS game;
CREATE TABLE games(
	game_id CHAR(36) NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255) NOT NULL,
	width INT NOT NULL,
    height INT NOT NULL,
	max_num_players INT NOT NULL,
    min_num_players INT NOT NULL,
    CONSTRAINT game__primary_key PRIMARY KEY(game_id)
);

DELIMITER ;;
CREATE TRIGGER create_game_uuid
BEFORE INSERT ON games FOR EACH ROW
BEGIN
	IF new.game_id IS NULL THEN
		SET new.game_id = uuid();
	END IF;
END;;
DELIMITER ;

DROP TABLE IF EXISTS reservations;
CREATE TABLE reservations(
	reservation_id CHAR(36) NOT NULL,
    user_id CHAR(36) NOT NULL,
    table_id CHAR(36) NOT NULL,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    CONSTRAINT reservations_primary_key PRIMARY KEY(reservation_id),
    CONSTRAINT reservations_users_foreing_key FOREIGN KEY(user_id) REFERENCES users(user_id),
	CONSTRAINT reservations_tables_foreing_key FOREIGN KEY(table_id) REFERENCES tables(table_id)
);