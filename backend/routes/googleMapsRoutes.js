// backend/routes/googleMapsRoutes.js
const express = require('express');
const router = express.Router();
const googleMapsController = require('../controllers/googleMapsController');

router.get('/directions', googleMapsController.getDirections);

module.exports = router;
