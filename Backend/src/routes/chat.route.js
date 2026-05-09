import express from 'express';
const router = express.Router();
import { chatBot } from '../controllers/chat.controller.js';

// POST /api/v1/chat
router.post('/', chatBot);

export default router;

