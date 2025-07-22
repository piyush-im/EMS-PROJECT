import express from 'express';
import authMiddleware from '../Middleware/authMiddleware.js';
import { addemployee,upload,getEmployees,getEmployee,updateEmployee,fetchEmployeesByDepId} from '../controller/employeeController.js';

const router =express.Router();

router.get('/',authMiddleware,getEmployees);
router.post('/add',authMiddleware,upload.single('image'),addemployee)
 router.get('/:id',authMiddleware,getEmployee)
router.put('/:id',authMiddleware,updateEmployee)
router.get('/department/:id',authMiddleware,fetchEmployeesByDepId);

export default router;