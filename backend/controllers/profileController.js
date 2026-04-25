import User from '../models/User.js';

// Get the profile of the logged-in user
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming `req.user.id` contains the logged-in user's ID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the user data
    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,         // Return name
        alerts: user.alerts,     // Return alerts (array of objects)
        location: user.location, // Return location data
      },
    });
  } catch (error) {
    console.error('❌ Error fetching profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update the profile of the logged-in user
const updateProfile = async (req, res) => {
  const { name, alerts, location } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update name if provided
    if (name) user.name = name;

    // Update alerts if provided
    if (alerts) {
      user.alerts = alerts;  // Set the new alert data (ensure it matches the format)
    }

    // Update location if provided
    if (location) user.location = location; // Set the new location (latitude, longitude)

    // Save the updated user document
    await user.save();

    // Return the updated profile data
    res.status(200).json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        alerts: user.alerts,
        location: user.location,
      },
    });
  } catch (error) {
    console.error('❌ Error updating profile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { getProfile, updateProfile };
