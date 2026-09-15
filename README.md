# StayEasy - Hotel Booking System

StayEasy is a full-stack hotel booking web application that allows users to browse hotels, view available rooms, register and login securely, book rooms, view their bookings, and cancel bookings.

## Features

- User registration and login
- JWT-based authentication
- Browse available hotels
- Search hotels by city
- View hotel details and rooms
- Book available rooms
- View bookings
- Cancel bookings
- Automatic room availability update
- RESTful backend APIs
- PostgreSQL database

## Technology Stack

### Frontend
- React
- Vite
- JavaScript
- Axios
- React Router

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Spring Security
- JWT Authentication
- Maven

### Database
- PostgreSQL

## Project Structure

```text
hotel-booking/
├── frontend source files
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/backend/
│   │   │   │   ├── controller/
│   │   │   │   ├── model/
│   │   │   │   ├── repository/
│   │   │   │   └── security/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   └── mvnw
└── README.md