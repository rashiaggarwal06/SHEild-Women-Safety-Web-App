import VoiceAlert from '../models/voiceAlert.js';

export const saveVoiceAlert = async (req, res) => {
  try {
    const { userId, detectedText } = req.body;

    if (!userId || !detectedText) {
      return res.status(400).json({ message: 'Missing userId or detectedText' });
    }

    console.log("✅ Voice Alert Received:", { userId, detectedText });

    const newAlert = new VoiceAlert({ userId, detectedText });
    await newAlert.save();

    res.status(201).json({ message: 'Voice alert saved successfully', alert: newAlert });
  } catch (error) {
    console.error('❌ Error saving voice alert:', error.message);
    res.status(500).json({ message: 'Failed to save voice alert' });
  }
};
