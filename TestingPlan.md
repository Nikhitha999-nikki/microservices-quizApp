# Thorough Testing Plan for QuizApp Microservices

## Prerequisites Verification
- [ ] Ensure Java 17+, Maven 3.6+, MySQL 8.0+ are installed.
- [ ] Start MySQL server (if not running).
- [ ] Execute `quizApp/questiondb.sql` for questiondb.
- [ ] Execute `quizdb.sql` for quizdb.

## Service Startup (in order)
- [ ] Start Service Registry (Eureka) on port 8761: cd service-registry && mvn spring-boot:run
- [ ] Start Question Service on port 8080: cd question_service/question_service && mvn spring-boot:run
- [ ] Start Quiz Service on port 8090: cd quiz-service/quiz-service && mvn spring-boot:run
- [ ] Start QuizApp Service on port 8081: cd quizApp && mvn spring-boot:run
- [ ] Start API Gateway on port 8765: cd api-gateway && mvn spring-boot:run

## Registration Verification
- [ ] Check Eureka dashboard at http://localhost:8761 for all 5 services registered and UP.

## Endpoint Testing (via API Gateway http://localhost:8765)
### Question Service Endpoints
- [ ] GET /question-service/question/allQuestions (happy path: retrieve all questions)
- [ ] GET /question-service/question/category/{category} (happy path: retrieve by category, e.g., Java)
- [ ] GET /question-service/question/id/{id} (happy path: retrieve by ID, e.g., 1)
- [ ] POST /question-service/question/add (happy path: add new question with valid JSON)
- [ ] Error paths: Invalid JSON, non-existent ID, empty category
- [ ] Edge cases: Large number of questions, special characters in questions

### Quiz Service Endpoints
- [ ] POST /quiz-service/quiz/create (happy path: create quiz with valid JSON, e.g., {"categoryName":"Java","numQuestions":5,"title":"Java Quiz"})
- [ ] GET /quiz-service/quiz/get/{id} (happy path: get quiz by ID)
- [ ] POST /quiz-service/quiz/submit/{id} (happy path: submit responses with valid JSON)
- [ ] Error paths: Invalid quiz ID, malformed JSON, quiz not found
- [ ] Edge cases: Submit with wrong answers, quiz with 0 questions, concurrent submissions

### Additional Checks
- [ ] Verify database connectivity (check logs for SQL errors)
- [ ] Test inter-service communication (e.g., quiz service calling question service)
- [ ] Check for any exceptions in service logs
- [ ] Performance: Time responses for endpoints

## Completion
- [ ] All steps completed successfully, services are working.
