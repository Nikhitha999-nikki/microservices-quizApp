package com.nikhitha.quizservice.dao;


import com.nikhitha.quizservice.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDao extends JpaRepository<Quiz,Integer>{


}
