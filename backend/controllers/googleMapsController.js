// backend/controllers/googleMapsController.js
const axios = require('axios');
const googleMapsConfig = require('../config/googleMapsConfig');

const getDirections = async (req, res, next) => {
  const { origin, destination } = req.query;

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/directions/json`, {
        params: {
          origin,
          destination,
          key: googleMapsConfig.apiKey,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDirections };
