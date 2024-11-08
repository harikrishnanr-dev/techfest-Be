// Import dotenv to load environment variables
require('dotenv').config();

// Import necessary modules
const express = require('express');
const path = require('path');  // Path module for handling file paths
require('./DB/connection');  // Database connection setup
const cors = require('cors');
const router = require('./Router/router');  // Router for API routes

// Create an Express app instance
const tfServer = express();

// Enable CORS (Cross-Origin Resource Sharing)
tfServer.use(cors());

// Middleware to parse incoming JSON data
tfServer.use(express.json());

// Use the router for handling API routes
tfServer.use(router);

// Serve static files from the 'uploads/event-posters' directory
// This will serve the images from the 'uploads/event-posters' folder publicly
tfServer.use('/uploads/event-posters', express.static(path.join(__dirname, 'uploads', 'event-posters')));

// Define the port for the server to listen on
const PORT = 4000;

// Start the server and listen for incoming requests
tfServer.listen(PORT, () => {
    console.log(`tfServer is running on http://localhost:${PORT}`);
});

// Basic route to check if the server is running
tfServer.get('/', (req, res) => {
    res.send("Server for Project is running");
});
