import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';

import { addLeave,getLeaves} from '../controller/leaveController.js';

const router =express.Router();


router.post('/add',authMiddleware,addLeave)
// routes/leaveRoutes.js
router.get('/:id', authMiddleware, getLeaves);


export default router;