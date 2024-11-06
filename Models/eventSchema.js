const mongoose = require('mongoose');

// Create event schema
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true // Format: HH:MM
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    registrationDeadline: {
        type: Date,
        required: true // Deadline for registration
    }
});

// Create model
const Event = mongoose.model("Event", eventSchema);

// Export the model
module.exports = Event;
