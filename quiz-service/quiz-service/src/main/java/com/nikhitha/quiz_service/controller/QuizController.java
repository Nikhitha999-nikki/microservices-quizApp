package com.nikhitha.quiz_service.controller;

import com.nikhitha.quiz_service.service.QuizService;
import com.nikhitha.quiz_service.model.QuestionWrapper;
import com.nikhitha.quiz_service.model.Response;
//import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
//import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("quiz")
public class QuizController {
    @Autowired
    QuizService quizService;

    @PostMapping("create")
    public ResponseEntity<Integer> createQuiz(@RequestBody Map<String, Object> quizDto){
        try {
            String categoryName = String.valueOf(quizDto.get("categoryName"));
            String title = String.valueOf(quizDto.get("title"));
            Object numQuestionsObj = quizDto.get("numQuestions");
            if (numQuestionsObj == null || categoryName == null || title == null) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            int numQuestions = Integer.parseInt(String.valueOf(numQuestionsObj));
            return quizService.createQuiz(categoryName, numQuestions, title);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    
    @GetMapping("get/{id}")

    public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id){
        return quizService.getQuizQuestions(id);
    }

    @PostMapping("submit/{id}" )
    public ResponseEntity<Integer> submitQuiz(@PathVariable Integer id,@RequestBody List<Response> responses)
    {
        return quizService.calculateResult(id,responses);
    }
}
