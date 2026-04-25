import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/User.js';

export const saveFaceData = async (req, res) => {
  try {
    const imageFile = req.file; // Expecting single file with name 'image'
    const { descriptors } = req.body; // Expecting JSON string

    if (!imageFile || !descriptors) {
      return res.status(400).json({ message: '❌ Image or face descriptors missing.' });
    }

    // Correcting the variable name here
    const parsedDescriptors = JSON.parse(descriptors); // Should use req.body.descriptors, not faceRecognitionData.descriptors

    const imageName = `${uuidv4()}.jpg`;

    const uploadDir = path.join(path.resolve(), 'uploads'); // Absolute path for production
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const imagePath = path.join(uploadDir, imageName);
    fs.writeFileSync(imagePath, imageFile.buffer);

    // Get user by ID from token (added by auth middleware)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: '❌ User not found.' });
    }

    user.faceRecognitionHistory.push({
      imageUrl: `/uploads/${imageName}`,
      descriptors: parsedDescriptors,
      timestamp: new Date(),
    });

    await user.save();

    res.status(200).json({ message: '✅ Face data saved successfully.' });
  } catch (err) {
    console.error('❌ Error saving face data:', err);
    res.status(500).json({ message: '❌ Internal server error.' });
  }
};
