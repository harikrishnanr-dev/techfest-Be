const express = require('express');
const router = new express.Router();
const userController = require('../Controllers/userController');
const eventRegistrationController = require('../Controllers/eventRegistrationController');
const { createEvent, getAllEvents } = require('../Controllers/eventController'); // Import event controller methods
const multerConfig = require('../Middlewares/multerMiddleware');  // Import multer config for file uploads

// User routes
router.post('/user/register', userController.register);
router.get('/user/getuserdetails', userController.getUserDetails); // Optional, implement if needed

// Event registration routes
router.post('/event/register', eventRegistrationController.registerForEvent);
router.get('/user/:userId/events', eventRegistrationController.getUserEventRegistrations); // Optional, to get user event registrations

// Event routes
// Add multerConfig.single('poster') for handling file uploads (poster field)
router.post('/events', multerConfig.single('poster'), createEvent); // Route to create an event
router.get('/events', getAllEvents); // Route to get all events

module.exports = router;
