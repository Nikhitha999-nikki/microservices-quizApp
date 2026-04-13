# 🚀 Microservices Quiz Application

## 📌 Overview
The Microservices Quiz Application is a distributed system designed to build and manage quizzes using a scalable microservices architecture.

This project separates core functionalities such as quiz management, question handling, and routing into independent services, enabling better scalability, maintainability, and real-world system design.

---

## 🎯 Features

### ✅ Implemented
- 📝 Quiz creation and management
- ❓ Question service for handling quiz questions
- 🌐 API Gateway for routing requests
- 🧭 Service Registry for service discovery
- 🎨 Basic frontend for interaction
- 🗄️ Database integration (SQL-based)

### 🚧 In Progress / Planned
- 🔐 Authentication & Authorization
- 📊 Result tracking system
- 📈 Analytics dashboard
---

## 🏗️ Architecture

This project follows **Microservices Architecture**, where each service is independently developed and deployed.

### 🔹 Services Overview

- **API Gateway**
  - Entry point for all client requests
  - Routes requests to respective services

- **Service Registry**
  - Handles service discovery (Eureka)

- **Quiz Service**
  - Manages quiz creation and operations

- **Question Service**
  - Handles question-related operations

- **Frontend**
  - User interface for interacting with the system

---

## 🛠️ Tech Stack

- **Backend:** Java, Spring Boot  
- **Microservices:** Spring Cloud (Eureka, Gateway)  
- **Frontend:** HTML/CSS/JS (update if React/Angular)  
- **Database:** MySQL  
- **Build Tool:** Maven  
- **Version Control:** Git & GitHub  

---

## 📂 Project Structure

microservices-quizApp/
│
├── api-gateway/ # API Gateway service
├── service-registry/ # Eureka Server
├── quiz-service/ # Quiz management service
├── question_service/ # Question handling service
├── frontend/ # UI layer
│
├── quizdb.sql # Database schema
├── TestingPlan.md # Testing documentation
├── README.md


---

## ⚙️ Setup Instructions

### 🔹 Prerequisites
- Java (JDK 8+)
- Maven
- MySQL
- Git

---

### 🔹 Clone Repository
```bash
git clone https://github.com/Nikhitha999-nikki/microservices-quizApp.git
cd microservices-quizApp

## 🔹 Database Setup
Import quizdb.sql into MySQL
Update DB credentials in application.properties

## 🔹 Run Services (IMPORTANT ORDER)
1️⃣ Start Service Registry
cd service-registry
mvn spring-boot:run
