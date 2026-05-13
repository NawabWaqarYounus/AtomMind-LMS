import { Router } from 'express';
import { getUserAnalytics, getAtRiskStudents, updateRiskScores } from '../controllers/analyticsController';

const router = Router();

router.get('/user/:userId', getUserAnalytics);
router.get('/at-risk', getAtRiskStudents);
router.post('/update', updateRiskScores);

export default router;
