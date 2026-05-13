import { Router } from 'express';
import { login, signup, getProfile, demoLogin } from '../controllers/authController';

const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/demo-login', demoLogin);
router.get('/profile/:userId', getProfile);

export default router;
