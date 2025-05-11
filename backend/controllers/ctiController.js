const axios = require('axios');

const getCTIData = async (req, res) => {
  try {
    // OTX API URL
    const url = 'https://otx.alienvault.com/api/v1/indicators/IPv4/8.8.8.8/general';

    // Make a GET request to OTX API
    const response = await axios.get(url, {
      headers: {
        'X-OTX-API-KEY': process.env.OTX_API_KEY
      }
    });

    // Extract data from the API response
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error fetching CTI data:', error.message);
    res.status(500).json({ error: 'Failed to fetch CTI data' });
  }
};

module.exports = { getCTIData };
