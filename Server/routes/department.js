import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { addDepartment,getDepartments,updateDepartment,getDepartment,deleteDepartment } from '../controller/departmentController.js';

const router =express.Router();

router.get('/',authMiddleware,getDepartments);
router.post('/add',authMiddleware,addDepartment)
router.get('/:id',authMiddleware,getDepartment)
router.put('/:id',authMiddleware,updateDepartment)
router.delete('/:id',authMiddleware,deleteDepartment)

export default router;