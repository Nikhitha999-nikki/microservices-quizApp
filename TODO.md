# Deployment Steps for QuizApp Microservices

## Prerequisites
- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Postman for API testing

## Database Setup
1. Start MySQL server
2. Run the SQL scripts:
   - Execute `quizApp/questiondb.sql` for questiondb
   - Execute `quizdb.sql` for quizdb

## Service Startup Order
1. **Service Registry (Eureka Server)**: Port 8761
   - Navigate to `service-registry/`
   - Run: `mvn spring-boot:run`

2. **Question Service**: Port 8080
   - Navigate to `question_service/question_service/`
   - Run: `mvn spring-boot:run`

3. **Quiz Service**: Port 8090
   - Navigate to `quiz-service/quiz-service/`
   - Run: `mvn spring-boot:run`

4. **QuizApp Service**: Port 8081
   - Navigate to `quizApp/`
   - Run: `mvn spring-boot:run`

5. **API Gateway**: Port 8765
   - Navigate to `api-gateway/`
   - Run: `mvn spring-boot:run`

## Testing with Postman
- API Gateway URL: http://localhost:8765
- Example endpoints:
  - GET /question-service/question/allQuestions
  - POST /quiz-service/quiz/create (with JSON body)
  - GET /quiz-service/quiz/get/{id}
  - POST /quiz-service/quiz/submit/{id}

## Eureka Dashboard
- Access Eureka at: http://localhost:8761
