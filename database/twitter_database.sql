DROP DATABASE IF EXISTS twitter_db;

CREATE DATABASE twitter_db;

USE twitter_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
	user_id INT NOT NULL AUTO_INCREMENT,
    user_handle VARCHAR(50) NOT NULL UNIQUE,
    email_addres VARCHAR(50) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number CHAR(10) UNIQUE,
    follower_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_update TIMESTAMP ON UPDATE NOW(),
    CONSTRAINT users_pk_user_id_constraint PRIMARY KEY(user_id)
);
INSERT INTO users(user_handle, email_addres, first_name, last_name, phone_number)
VALUES
('user1','user1@gmail.com','User1 First Name','User1 Last Name','611111111'),
('user2','user2@gmail.com','User2 First Name','User2 Last Name','622222222'),
('user3','user3@gmail.com','User3 First Name','User3 Last Name','633333333'),
('user4','user4@gmail.com','User4 First Name','User4 Last Name','644444444'),
('user5','user5@gmail.com','User5 First Name','User5 Last Name','655555555');

DROP TABLE IF EXISTS followers;
CREATE TABLE followers(
	follower_id INT,
    following_id INT,
    CONSTRAINT followers_pk_follower_following_id_constraint PRIMARY KEY(follower_id, following_id),
    CONSTRAINT followers_following_id_fk_users_user_id_constraint FOREIGN KEY(follower_id) REFERENCES users(user_id),
    CONSTRAINT followers_follower_id_fk_users_user_id_constraint FOREIGN KEY(following_id) REFERENCES users(user_id),
    CONSTRAINT check_follower_cannot_follow_itself CHECK (follower_id <> following_id)
);
-- INSERT INTO followers(follower_id, following_id)
-- VALUES
-- (1,2),
-- (1,3),
-- (1,4),
-- (1,5),
-- (2,1),
-- (3,2),
-- (4,5),
-- (5,4);
SELECT follower_id, following_id FROM followers;
SELECT follower_id FROM followers WHERE following_id = 1;

-- Info en perfil seguidos y seguidores
SELECT COUNT(follower_id) AS 'Followers'FROM followers WHERE following_id = 1; 
SELECT COUNT(following_id) AS 'Following' FROM followers WHERE follower_id = 1;

-- Top 3 usuarios con mayor numero de seguidores
SELECT u.user_handle, COUNT(f.follower_id) AS 'Followers' 
FROM followers f
JOIN users u 
ON f.following_id = u.user_id
GROUP BY f.following_id 
ORDER BY COUNT(f.follower_id) DESC 
LIMIT 3; 

DROP TABLE IF EXISTS tweets;
CREATE TABLE tweets(
	tweet_id INT AUTO_INCREMENT,
    user_id INT NOT NULL,
    tweet_text VARCHAR(280) NOT NULL,
    likes INT DEFAULT 0,
    retweets INT DEFAULT 0,
    comments INT DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT tweets_pk_tweet_id PRIMARY KEY(tweet_id),
    CONSTRAINT tweets_user_id_fk_users_user_id FOREIGN KEY(user_id) REFERENCES users(user_id)
);
INSERT INTO tweets(user_id,tweet_text)
VALUES
(1, 'Hey I\'m User1!'),
(1, 'User1 second tweet!'),
(2, 'Hey I\'m User2!'),
(3, 'Hey I\'m User3!'),
(4, 'Hey I\'m User4!'),
(5, 'Hey I\'m User5!');

-- Tweets por usuario
SELECT u.user_handle, COUNT(t.user_id) AS 'Tweets publicados'
FROM tweets t
JOIN users u
ON u.user_id = t.user_id
GROUP BY t.user_id;

-- SUBCONSULTA
-- Obtener todos los tweets de los usuarios que tienen mas de 2 seguidores
SELECT * FROM tweets
WHERE user_id IN (SELECT following_id FROM followers GROUP BY following_id HAVING COUNT(*) >= 2);

-- DELETE
DELETE FROM tweets WHERE user_id = 1;

-- UPDATE 
UPDATE tweets SET comments = comments + 1 WHERE tweet_id = 3;
UPDATE tweets SET tweet_text = REPLACE(tweet_text, 'User', 'Bot') WHERE tweet_text LIKE '%User%' AND user_id = 1;

CREATE TABLE tweet_likes(
	user_id INT,
    tweet_id INT,
    CONSTRAINT tweet_likes_user_id_fk_users_user_id_constraint FOREIGN KEY(user_id) REFERENCES users(user_id),
    CONSTRAINT tweet_likes_tweet_id_fk_tweets_tweet_id_constraint FOREIGN KEY(tweet_id) REFERENCES tweets(tweet_id),
    CONSTRAINT tweets_likes_user_id_tweet_id_pk_constraint PRIMARY KEY(user_id, tweet_id)
);
INSERT INTO tweet_likes(user_id, tweet_id)
VALUES
(1,4),
(1,5),
(2,4),
(2,5),
(3,4),
(3,5),
(4,4),
(4,5),
(5,5);

-- Obtener el numero de likes por tweet
SELECT t.tweet_id, t.tweet_text, COUNT(tl.tweet_id) AS 'Número de likes' 
FROM tweets t 
JOIN tweet_likes tl 
ON  t.tweet_id = tl.tweet_id 
GROUP BY tl.tweet_id;

-- TRIGGER
DROP TRIGGER IF EXISTS increase_follower_count;
DELIMITER $$
CREATE TRIGGER increase_follower_count
	AFTER INSERT ON followers
    FOR EACH ROW
    BEGIN
		UPDATE users SET follower_count = follower_count + 1
		WHERE user_id = NEW.following_id;
    END$$
DROP TRIGGER IF EXISTS decrease_follower_count;
DELIMITER $$
CREATE TRIGGER decrease_follower_count
	AFTER DELETE ON followers
    FOR EACH ROW
    BEGIN
		UPDATE users SET follower_count = follower_count - 1
		WHERE user_id = NEW.following_id;
    END$$
INSERT INTO followers(follower_id, following_id)
VALUES
(1,2),
(1,3),
(1,4),
(1,5),
(2,1),
(3,2),
(4,5),
(5,4);