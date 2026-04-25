// src/api/userApi.js

import axios from 'axios';

// Set your base URL (adjust if using a different API base URL)
const BASE_URL = 'http://localhost:5000/api/users';

// Function to update user location
export const updateLocation = async (locationData, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/update-location`,
      locationData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token for authentication
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || error.message || 'Updating location failed'
    );
  }
};

// Add other API methods (login, register, etc.) here as needed
