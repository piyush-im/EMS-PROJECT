import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import departmentRouter from './routes/department.js';
import salaryRouter from './routes/salary.js';
import employeeRouter from './routes/employee.js';
import connectToDatabase from './db/db.js';
import dotenv from 'dotenv';  // Using ES module import
import { upload } from './controller/employeeController.js';

// Load environment variables from .env file
dotenv.config();

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static('publlic/uploads'))
app.use('/api/auth', authRoutes);
app.use('/api/department', departmentRouter);
app.use('/api/employee', employeeRouter);
app.use('/api/salary',salaryRouter)

const PORT = process.env.PORT || 500;  // Default to 5000 if PORT is not defined in .env

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
