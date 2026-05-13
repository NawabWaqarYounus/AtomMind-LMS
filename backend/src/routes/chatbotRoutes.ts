import { Router } from 'express';
import { handleChat, getChatHistory } from '../controllers/chatbotController';

const router = Router();

router.post('/', handleChat);
router.get('/history', getChatHistory);

export default router;
