import { Router } from 'express';
import { getStudentDashboardData, getProgress, getRecommendations } from '../controllers/dashboardController';

const router = Router();

router.get('/student', getStudentDashboardData);
router.get('/progress', getProgress);
router.get('/recommendations', getRecommendations);

export default router;
