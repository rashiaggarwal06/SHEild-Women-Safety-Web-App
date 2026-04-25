import express from 'express';
import { getProfile, updateProfile } from '../controllers/profileController.js';
import { protect } from '../middleware/authMiddleware.js';  // Assuming you have authentication middleware

const router = express.Router();

// Route to get the profile of the logged-in user
router.get('/profile', protect, getProfile);

// Route to update the profile of the logged-in user
router.put('/profile', protect, updateProfile);

export default router;
