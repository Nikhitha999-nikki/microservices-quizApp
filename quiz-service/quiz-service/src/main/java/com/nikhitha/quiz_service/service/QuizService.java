package com.nikhitha.quiz_service.service;

import com.nikhitha.quiz_service.dao.QuizDao;
import com.nikhitha.quiz_service.model.Quiz;
import com.nikhitha.quiz_service.model.QuestionWrapper;
import com.nikhitha.quiz_service.model.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.nikhitha.quiz_service.feign.QuizInterface;

import java.util.List;
import java.util.Optional;

@Service

public class QuizService {
    @Autowired
    QuizDao quizDao;

    @Autowired
    QuizInterface quizInterface;
    

    public ResponseEntity<Integer> createQuiz(String category, int numQ, String title) {
        try {
            ResponseEntity<List<Integer>> questionsResponse = quizInterface.getQuestionsForQuiz(category, numQ);
            if (!questionsResponse.getStatusCode().is2xxSuccessful()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            List<Integer> questions = questionsResponse.getBody();
            if (questions == null || questions.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }

            Quiz quiz = new Quiz();
            quiz.setTitle(title);
            quiz.setQuestionIds(questions);
            Quiz saved = quizDao.save(quiz);

            return new ResponseEntity<>(saved.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id){
        Optional<Quiz> quizOpt = quizDao.findById(id);
        if (quizOpt.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        try {
            Quiz quiz = quizOpt.get();
            List<Integer> questionIds = quiz.getQuestionIds();
            ResponseEntity<List<QuestionWrapper>> questions = quizInterface.getQuestionsFromId(questionIds);
            return questions;
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_GATEWAY);
        }
    }

    public ResponseEntity<Integer> calculateResult(Integer id,List<Response> responses){
        
        ResponseEntity<Integer> score=quizInterface.getScore(responses);
        return score;

    }

}
