package com.nikhitha.quiz_service.dao;


import com.nikhitha.quiz_service.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizDao extends JpaRepository<Quiz,Integer>{


}
