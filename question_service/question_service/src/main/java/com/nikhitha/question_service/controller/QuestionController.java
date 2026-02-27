//package com.nikhitha.question_service.controller;
//
//import com.nikhitha.question_service.service.QuestionService;
//import com.nikhitha.question_service.model.Response;
//import com.nikhitha.question_service.model.QuestionWrapper; 
//import com.nikhitha.question_service.model.Question;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.core.env.Environment;    
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import java.util.List;
//
//@RestController
//@RequestMapping("question")
//public class QuestionController {
//    @Autowired
//    QuestionService questionservice;
//
//    @Autowired  
//    Environment environment;
//
//    @GetMapping("allQuestions")
//    public ResponseEntity<List<Question>> getAllQuestions() {
//        return new ResponseEntity<>(questionService.getAllQuestions(), HttpStatus.OK);
//    }
//
//    @GetMapping("category/{category}")
//    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category){
//        return questionService.getQuestionsByCategory(category);
//
//    }
//
//    @PostMapping("add")
//    @DeleteMapping("delete")
//    @PostMapping("update")
//    public ResponseEntity<String> addQuestion(@RequestBody Question question){
//        
//        return questionservice.addQuestion(question);
//    }
//
////    @GetMapping("generate")
////    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String categoryName
////    ,@RequestParam String numQuestions){
////        return questionservice.getQuestionsForQuiz(categoryName, Integer.parseInt(numQuestions));   
////
////    }
//    @GetMapping("generate")
//    public ResponseEntity<List<Integer>> getQuestionsForQuiz
//    (@RequestParam String categoryName,@RequestParam Integer numQuestions){
//        return questionservice.getQuestionsForQuiz(categoryName,numQuestions);
//
//    }
//    @PostMapping("getQuestions")
//    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer> questionIds)
//    {
//        System.out.println(environment.getProperty("local.server.port"));   
//        return questionservice.getQuestionsFromId(questionIds);
//    }
//
//    @PostMapping("getScore")
//    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses)
//    {
//        return questionservice.getScore(responses);
//    }
//}
package com.nikhitha.question_service.controller;

import com.nikhitha.question_service.service.QuestionService;
import com.nikhitha.question_service.model.Response;
import com.nikhitha.question_service.model.QuestionWrapper; 
import com.nikhitha.question_service.model.Question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;    
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("question")
public class QuestionController {

    @Autowired
    QuestionService questionservice;

    @Autowired  
    Environment environment;

    @GetMapping("allQuestions")
    public ResponseEntity<List<Question>> getAllQuestions() {
        return questionservice.getAllQuestions();
    }

    @GetMapping("category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category){
        return questionservice.getQuestionsByCategory(category);
    }

    @PostMapping("add")
    public ResponseEntity<String> addQuestion(@RequestBody Question question){

        return questionservice.addQuestion(question);
    }

    // Optional: delete and update endpoints can be added later if needed

    @GetMapping("generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(
        @RequestParam String categoryName,
        @RequestParam Integer numQuestions){
        return questionservice.getQuestionsForQuiz(categoryName,numQuestions);
    }

    @PostMapping("getQuestions")
    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer> questionIds){
        System.out.println(environment.getProperty("local.server.port"));   
        return questionservice.getQuestionsFromId(questionIds);
    }

    @PostMapping("getScore")
    public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses){
        return questionservice.getScore(responses);
    }

    @GetMapping("categoryCounts")
    public ResponseEntity<Map<String, Long>> getCategoryCounts() {
        return questionservice.getCategoryCounts();
    }
}

