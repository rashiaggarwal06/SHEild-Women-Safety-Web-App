// backend/routes/alertRoute.js
import express from 'express';
import { sendAlert, getAlertsByUser } from '../controllers/alertController.js';

const router = express.Router();

router.post('/alert', sendAlert);
router.get('/:userId', getAlertsByUser); // <-- you’re using this, so you must import it

export default router;
