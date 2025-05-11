const express = require('express');
const { getCTIData } = require('../controllers/ctiController');

const router = express.Router();

// Route to fetch CTI data
router.get('/data', getCTIData);

module.exports = router;
