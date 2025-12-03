package com.nikhitha.quizApp.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nikhitha.quizApp.model.Quiz;

public interface QuizDao extends JpaRepository<Quiz,Integer>{


}
