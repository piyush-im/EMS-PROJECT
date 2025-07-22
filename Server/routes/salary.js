import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { addSalary } from '../controller/salaryController.js';


const router =express.Router();


router.post('/add',authMiddleware,addSalary)

export default router;