// backend/services/googleMapsService.js
import axios from 'axios';
import { apiKey } from '../config/googleMapsConfig.js';

const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address,
          key: apiKey,
        },
      }
    );
    return response.data.results[0].geometry.location;
  } catch (error) {
    throw new Error('Error fetching coordinates from Google Maps API');
  }
};

export { getCoordinates };
