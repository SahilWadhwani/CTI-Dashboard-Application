const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());



// Import routes
const ctiRoutes = require('./routes/ctiRoutes');

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'CTI Dashboard Backend Running' });
});

app.use('/api/cti', ctiRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
