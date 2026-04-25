import express from 'express';
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateLocation,
} from '../controllers/userController.js';
import { saveVoiceAlert } from '../controllers/voiceDetectionController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authenticate, getUserProfile);
router.post('/update-location', authenticate, updateLocation); // New route
router.post('/save-voice-alert', authenticate, saveVoiceAlert); 
// router.post('/save-face-data', authenticate, saveFaceRecognitionData);

export default router;
