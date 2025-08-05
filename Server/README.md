# Server

This folder contains the backend code for the EMS (Employee Management System) project. Built with Node.js and Express, it provides RESTful APIs for managing users, departments, employees, and salaries.

## Structure
- `controller/`: Contains controllers for authentication, department, employee, and salary operations.
- `db/`: Database connection setup.
- `Middleware/`: Custom middleware for authentication and request handling.
- `Models/`: Mongoose models for User, Department, Employee, and Salary.
- `publlic/uploads/`: Directory for uploaded files.
- `routes/`: Express route definitions for API endpoints.
- `userSeed.js`: Script for seeding initial user data.
- `index.js`: Main server entry point.

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```

## Features
- JWT-based authentication
- CRUD operations for departments, employees, and salaries
- File uploads
- Role-based access control

## Technologies
- Node.js
- Express
- MongoDB (Mongoose)
- JWT

---
