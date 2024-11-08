const mongoose = require('mongoose');

// Create user schema without username field
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure emails are unique
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        default: "" // Default profile value
    },
    firstname: {
        type: String,
        required: true // Ensure first name is provided
    },
    lastname: {
        type: String,
        required: true // Ensure last name is provided
    },
    college: {
        type: String,
        required: true // Ensure college name is provided
    },
    batch: {
        type: String,
        required: true // Ensure batch is provided
    },
    year: {
        type: String,
        required: true // Ensure year is provided
    },
    phonenumber: {
        type: String,
        required: true, // Ensure phone number is provided
        unique: true // Ensure phone numbers are unique
    }
});

// Create model
const users = mongoose.model("users", userSchema);

// Export the model
module.exports = users;
