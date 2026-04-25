// Import required packages

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import axios from 'axios';
import fs from 'fs';
import errorMiddleware from './middleware/errorMiddleware.js';

// Import routes
import userRoutes from './routes/userRoute.js';
import alertRoutes from './routes/alertRoute.js';
import faceRoutes from './routes/faceRoute.js';
import voiceRoutes from './routes/voiceRoute.js';
import locationRoutes from './routes/locationRoute.js';
import profileRoutes from './routes/profileRoute.js';  // Profile route

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(express.json());  // For parsing JSON
app.use(express.urlencoded({ extended: true }));  // For parsing form data

app.use(cors({
  origin: 'http://localhost:3000',  // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/models', express.static(path.join(__dirname, 'models')));

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Serve static files (for accessing uploaded images)
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Google Maps API Config
const googleMapsConfig = {
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
};

// Geolocation fetch using Google Maps API
const getGeolocation = async (address) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${googleMapsConfig.apiKey}`;
    const response = await axios.get(url);

    if (response.data.status !== 'OK') {
      throw new Error('Failed to fetch geolocation data');
    }

    return response.data.results[0]?.geometry.location;
  } catch (error) {
    console.error('❌ Error fetching geolocation:', error.message);
    throw new Error('Unable to retrieve location data');
  }
};

// API routes
app.use('/api/users', userRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/face-recognition', faceRoutes);
app.use('/api/voice-detection', voiceRoutes);
app.use('/api/location-tracking', locationRoutes);
app.use('/api/profile', profileRoutes);
app.use('/models', express.static(path.join(__dirname, 'models')));
// Geolocation test endpoint
app.get('/get-location', async (req, res) => {
  const { address } = req.query;

  try {
    if (!address) {
      return res.status(400).json({ message: 'Address parameter is required' });
    }

    const location = await getGeolocation(address);
    res.json({ location });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('🌐 Welcome to the Women\'s Safety App API');
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err);
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
