package com.nikhitha.question_service.service;  


import com.nikhitha.question_service.model.Response;
import org.springframework.http.ResponseEntity;
import com.nikhitha.question_service.dao.QuestionDao;   
import com.nikhitha.question_service.model.Question;
import com.nikhitha.question_service.model.QuestionWrapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class QuestionService {
    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<List<Question>> getAllQuestions(){
        try{
            return new ResponseEntity<>(questionDao.findAll(), HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);

    }
    public ResponseEntity<List<Question>> getQuestionsByCategory(String category){
        try{
            return new ResponseEntity<>(questionDao.findByCategory(category),HttpStatus.OK);
        }catch(Exception e){
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }
    public ResponseEntity<String> addQuestion(Question question){
        questionDao.save(question);
        return new ResponseEntity<>("success",HttpStatus.CREATED);
    }
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(String categoryName,Integer numQuestions)
    {
        List<Integer> questions=questionDao.findRandomQuestionByCategory(categoryName,numQuestions);
        return new ResponseEntity<>(questions,HttpStatus.OK);
    }
    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(List<Integer> questionIds)
    {
        List<QuestionWrapper> wrappers=new ArrayList<>();
        if (questionIds == null || questionIds.isEmpty()) {
            return new ResponseEntity<>(wrappers, HttpStatus.OK);
        }

        for (Integer id : questionIds) {
            Optional<Question> questionOpt = questionDao.findById(id);
            if (questionOpt.isEmpty()) {
                // Quiz references a deleted/missing question id.
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Question question = questionOpt.get();
            QuestionWrapper wrapper = new QuestionWrapper();
            wrapper.setId(question.getId());
            wrapper.setQuestionTitle(question.getQuestionTitle());
            wrapper.setOption1(question.getOption1());
            wrapper.setOption2(question.getOption2());
            wrapper.setOption3(question.getOption3());
            wrapper.setOption4(question.getOption4());
            wrappers.add(wrapper);
        }

        return new ResponseEntity<>(wrappers,HttpStatus.OK);
    }
    public ResponseEntity<Integer> getScore(List<Response> responses){
        int right = 0;
        for (Response response : responses) {
            Optional<Question> questionOpt = questionDao.findById(response.getId());
            if (questionOpt.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Question question = questionOpt.get();
            if(response.getResponse().equals(question.getRightAnswer())){
                right++;
            }
        }
        return new ResponseEntity<>(right,HttpStatus.OK);
    }

    public ResponseEntity<Map<String, Long>> getCategoryCounts() {
        List<Question> questions = questionDao.findAll();
        Map<String, Long> counts = new LinkedHashMap<>();
        for (Question q : questions) {
            String category = q.getCategory();
            counts.put(category, counts.getOrDefault(category, 0L) + 1L);
        }
        return new ResponseEntity<>(counts, HttpStatus.OK);
    }
}
