
import mongoose from 'mongoose';

const voiceAlertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  detectedText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Check if model already exists, otherwise create it
const VoiceAlert = mongoose.models.VoiceAlert || mongoose.model('VoiceAlert', voiceAlertSchema);

export default VoiceAlert;
