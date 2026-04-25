import express from 'express';
import { saveVoiceAlert } from '../controllers/voiceDetectionController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/saveVoiceAlert', protect, saveVoiceAlert);

export default router;
