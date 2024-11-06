
const express = require('express');
const router = new express.Router();
const userController = require('../Controllers/userController');
const eventRegistrationController = require('../Controllers/eventRegistrationController');

// User routes
router.post('/user/register', userController.register);
router.get('/user/getuserdetails', userController.getUserDetails); // Optional, implement if needed

// Event registration routes
router.post('/event/register', eventRegistrationController.registerForEvent);
router.get('/user/:userId/events', eventRegistrationController.getUserEventRegistrations); // Optional, to get user event registrations

// Event routes
router.post('/events', createEvent); // Route to create an event
router.get('/events', getAllEvents); // Route to get all events

module.exports = router;
