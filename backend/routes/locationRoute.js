// backend/routes/locationRoutes.js

import express from 'express';
import { saveLocation, getLocation } from '../controllers/locationTrackingController.js'; // Ensure correct path

const router = express.Router();

// Define routes for saving and getting location
router.post('/', saveLocation);
router.get('/:userId', getLocation);

export default router;
