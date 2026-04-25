import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

// ==============================
// Auth and User Profile Services
// ==============================

export const registerUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users/login`, userData);
  return response.data;
};

export const fetchUserProfile = async (token) => {
  const response = await axios.get(`${BASE_URL}/users/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ==============================
// Location and Alert Services
// ==============================

export const updateLocation = async (locationData, token) => {
  const response = await axios.post(`${BASE_URL}/users/update-location`, locationData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addAlert = async (alertData, token) => {
  const response = await axios.post(`${BASE_URL}/users/add-alert`, alertData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ==============================
// Voice Detection Service
// ==============================

export const saveVoiceAlert = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/voice-detection/saveVoiceAlert`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // optional but good practice
    },
  });
  return response.data;
};


export const saveFaceData = async (imageUrl, token) => {
  const response = await axios.post(
    `${BASE_URL}/users/save-face-data`,
    { imageUrl },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
