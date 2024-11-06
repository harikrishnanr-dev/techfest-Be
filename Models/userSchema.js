const mongoose = require('mongoose');

// Create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
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
    }
});

// Create model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
