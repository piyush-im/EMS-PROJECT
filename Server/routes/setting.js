import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { changePassword } from '../controller/settingControoler.js';



const router =express.Router();


router.put('/change-password',authMiddleware,changePassword)


export default router;