<<<<<<< HEAD

# EMS Project

Full-stack Employee Management System (EMS)

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express, MongoDB

## Quick Start
```sh
cd Frontend && npm install && npm run dev
cd Server && npm install && npm start
```

## Features
- Dashboards for admin & employees
- CRUD for departments, employees, salaries
- Role-based authentication
=======
This project is a full-stack MERN-based Employee Management System, divided into frontend and backend modules. It allows admins to manage employee records, departments, and salary details with authentication and file upload capabilities.

📦 1. Backend (Node.js + Express + MongoDB)
🔹Technologies:
Node.js, Express
MongoDB with Mongoose
JWT, Multer, bcryptjs

## Structure
- `controller/`: Contains controllers for authentication, department, employee, and salary operations.
- `db/`: Database connection setup.
- `Middleware/`: Custom middleware for authentication and request handling.
- `Models/`: Mongoose models for User, Department, Employee, and Salary.
- `publlic/uploads/`: Directory for uploaded files.
- `routes/`: Express route definitions for API endpoints.
- `userSeed.js`: Script for seeding initial user data.
- `index.js`: Main server entry point.

🔹Features
✅ JWT Authentication
✅ Admin user seeding
✅ CRUD operations for:
   Departments
   Employees (with file upload)
   Salaries
✅ Role-Based Access Control (RBAC)
✅ RESTful APIs with Express.js

🔹Usage:
cd server
npm install
npm start

🔹.env
PORT=5000
MONGODB_URL="mongodb://127.0.0.1:27017/ems"
JWT_KEY="yourSecretKeyHere"

📦 2. Frontend(React)

npm install       # Install dependencies
npm run dev       # Start development server

🔹Technologies:
React 18 – UI framework
Vite – Fast development server & build tool
Tailwind CSS – Utility-first CSS
Axios – API requests
React Data Table – Interactive tables
ESLint – Code quality and linting

🔹Key Features:
 Role-based login system (Admin & Employee)
 CRUD operations for Employees, Departments, Salaries
 DataTables for structured data display
 Responsive UI with Tailwind CSS
 Routing handled by React Router

 ## Structure
- `src/main.jsx`: Entry point for the React app; renders the root component.
- `src/App.jsx`: Main application component; handles routing and layout.
- `src/components/`: Reusable UI components like Navbar, Sidebar, Cards, etc.
- `src/pages/`: Full pages/views like Login, Dashboard, EmployeeList, etc.
- `src/services/`: Contains Axios-based API service files for handling backend requests.
- `src/assets/`: Static assets such as logos, images, or icons.
- `src/styles/`: (Optional) Custom styles or Tailwind overrides.

 

>>>>>>> a41fb9382c3e36486d8be609fbcb82d3f5db05d5
