const express = require('express');
const router = new express.Router();
const userController = require('../Controllers/userController');
// const eventRegistrationController = require('../Controllers/eventRegistrationController');
// const { createEvent, getAllEvents } = require('../Controllers/eventController'); // Import event controller methods
const jwtMiddleware = require('../Middlewares/jwtMiddleware')
// const multer = require('../Middlewares/multerMiddleware');
// const multerConfig = require('../Middlewares/multerMiddleware');  // Import multer config for file uploads

// User routes
router.post('/user/register', userController.register);
router.post('/user/login',userController.login) 
//events
// router.post('/events', multerConfig.single('poster'), createEvent); // Route to create an event
// router.get('/events', getAllEvents); // Route to get all events

// const { bookEvent } = require('../Controllers/bookingController');

// router.post('/bookEvent', bookEvent);


module.exports = router;
