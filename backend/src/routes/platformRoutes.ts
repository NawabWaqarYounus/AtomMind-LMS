import { Router } from 'express';
import { getPlatformStats } from '../controllers/platformController';

const router = Router();

router.get('/stats', getPlatformStats);

export default router;
