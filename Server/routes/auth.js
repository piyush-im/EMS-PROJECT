import express, { Router } from 'express';
import {login,verify} from '../controller/authControllerr.js';
import authMiddleware from '../Middleware/authMiddleware.js'



const router= express.Router();

router.post('/login',login)
router.get('/verify',authMiddleware,verify)


export default router