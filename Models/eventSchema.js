const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true
  },
  eventDescription: {
    type: String,
    required: true
  },
  eventCategory: {
    type: String,
    required: true
  },
  registrationDeadline: {
    type: Date,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  eventVenue: {
    type: String,
    required: true
  },
  poster: {
    type: String, // Store the file path of the event poster
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Event = mongoose.model('events', eventSchema);

module.exports = Event;
