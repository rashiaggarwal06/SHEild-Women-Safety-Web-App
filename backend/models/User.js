import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'is invalid'],
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: false,
  },
  alerts: [
    {
      message: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  locationHistory: [
    {
      latitude: Number,
      longitude: Number,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  voiceAlerts: [
    {
      transcript: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  faceRecognitionHistory: [
    {
      imageUrl: String,
      descriptors: {
      type: [Array], // Expect an array of arrays of numbers
      required: true
    },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }
  ],
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
