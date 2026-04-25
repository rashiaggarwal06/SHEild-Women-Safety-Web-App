import express from 'express';
import multer from 'multer';
import { saveFaceData } from '../controllers/faceRecognitionController.js';
import { protect } from '../middleware/authMiddleware.js'; // ✅ Ensure auth middleware is used

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/save-face-data', protect, upload.single('image'), saveFaceData);

export default router;
