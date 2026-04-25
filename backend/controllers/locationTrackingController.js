// backend/controllers/locationTrackingController.js

import { Location } from '../models/Location.js'; // Use named import

// Save location data
export const saveLocation = async (req, res) => {
  const { userId, latitude, longitude } = req.body;

  try {
    const newLocation = new Location({
      userId,
      latitude,
      longitude,
      timestamp: new Date(),
    });

    await newLocation.save();

    res.status(201).json({
      message: 'Location saved successfully!',
      data: newLocation,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to save location',
      error: error.message,
    });
  }
};

// Get the most recent location of a user
export const getLocation = async (req, res) => {
  const { userId } = req.params;

  try {
    const location = await Location.findOne({ userId }).sort({ timestamp: -1 });

    if (!location) {
      return res.status(404).json({
        message: 'Location not found for this user',
      });
    }

    res.status(200).json({
      message: 'Location retrieved successfully',
      data: location,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to retrieve location',
      error: error.message,
    });
  }
};
