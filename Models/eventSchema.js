// eventSchema.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  eventDescription: { type: String, required: true },
  eventCategory: { type: String, required: true },
  registrationDeadline: { type: Date, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventVenue: { type: String, required: true },
  posterPath: { type: String, required: true }  // Store the file path
});

const Event = mongoose.model("events", eventSchema);
module.exports = Event;

