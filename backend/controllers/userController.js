import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import asyncHandler from 'express-async-handler';

// @desc    Register new user
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  console.log('📩 Register API called');
  console.log('Request body:', req.body);

  try {
    const { email, password, confirmPassword, name } = req.body;

    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password, name });
    const savedUser = await user.save();

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: savedUser._id,
        email: savedUser.email,
        name: savedUser.name,
      },
    });
  } catch (error) {
    console.error('❌ Error registering user:', error.message);
    return res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error); // Check your terminal/server logs
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get user profile by ID
// @route   GET /api/users/profile/:id
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error fetching user profile:', error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// @desc    Update user location history
// @route   POST /api/users/location
export const updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.locationHistory.push({ latitude, longitude, timestamp: new Date() });
    await user.save();

    res.status(200).json({ message: 'Location updated successfully' });
  } catch (err) {
    console.error('❌ Location update error:', err.message);
    res.status(500).json({ message: 'Failed to update location' });
  }
};


// Create uploads folder if it doesn't exist
const uploadDir = 'uploads/faces';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage }).single('image');

// @desc    Save face recognition image and descriptors to DB
// @route   POST /api/users/save-face-data
// @access  Private
export const saveFaceRecognitionData = (req, res) => {
  upload(req, res, async function (err) {
    if (err) {
      console.error('❌ Multer error:', err.message);
      return res.status(500).json({ message: 'Image upload failed' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    try {
      // Construct image URL
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/faces/${req.file.filename}`;

      // Find the user by ID
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Save face recognition data
      user.faceRecognitionHistory.push({
        imageUrl,
        timestamp: new Date(),
      });

      // Save face descriptors in the FaceRecognition model
      const { faceDescriptors } = req.body;  // Assuming faceDescriptors are sent from the frontend

      // Parse faceDescriptors from JSON if necessary
      const descriptors = JSON.parse(faceDescriptors);

      const faceData = new FaceRecognition({
        user: req.user.id,  // Link to the current user
        faceDescriptors: descriptors,  // Store the descriptors
        imageUrl,  // URL of the uploaded image
      });

      // Save the face recognition data
      await faceData.save();
      await user.save();

      // Respond with success
      res.status(200).json({
        message: 'Face image and data saved successfully',
        imageUrl,
      });
    } catch (error) {
      console.error('❌ Server error saving face image and data:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
};