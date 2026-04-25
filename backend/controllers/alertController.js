// backend/controllers/alertController.js
import Alert from '../models/voiceAlert.js';

/**
 * Controller to handle sending a new alert
 */
export const sendAlert = async (req, res) => {
  try {
    const { userId, message, location, timestamp } = req.body;

    if (!userId || !message || !location) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newAlert = new Alert({
      userId,
      message,
      location,
      timestamp: timestamp || new Date(),
    });

    await newAlert.save();

    res.status(201).json({ success: true, message: 'Alert sent successfully', alert: newAlert });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

/**
 * Controller to fetch alerts by user ID (optional, only if needed)
 */
export const getAlertsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const alerts = await Alert.find({ userId }).sort({ timestamp: -1 });

    res.status(200).json({ success: true, alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching alerts', error: error.message });
  }
};