CREATE DATABASE quizdb;

USE quizdb;

CREATE TABLE quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    question_ids JSON
);
