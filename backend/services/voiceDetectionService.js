// backend/controllers/voiceController.js
import { User } from '../models/User.js';

export const saveVoiceAlert = async (req, res) => {
  try {
    const { transcript } = req.body;
    const userId = req.user.id;

    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.voiceAlerts.push({ transcript });
    await user.save();

    res.status(200).json({ message: 'Voice alert saved successfully' });
  } catch (error) {
    console.error('Voice alert save error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
