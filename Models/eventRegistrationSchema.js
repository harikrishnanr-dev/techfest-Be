const mongoose = require('mongoose');

// Create event registration schema
const eventRegistrationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users' // Reference to the User model
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    batch: {
        type: String,
        required: true
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'events' // Reference to the Event model
    },
    registrationDate: {
        type: Date,
        default: Date.now // Automatically set registration date to now
    }
});

// Ensure unique registration for the same user and event
eventRegistrationSchema.index({ userId: 1, eventId: 1 }, { unique: true });

// Create model
const EventRegistration = mongoose.model("eventregistrations", eventRegistrationSchema);

// Export the model
module.exports = EventRegistration;
