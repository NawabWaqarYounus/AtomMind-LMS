import { Router } from 'express';
import { getInstructorDashboard, getRiskAssessment } from '../controllers/instructorController';

const router = Router();

router.get('/dashboard', getInstructorDashboard);
router.get('/risk', getRiskAssessment);

export default router;
