const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');

// Register user
exports.register = async (req, res) => {
    console.log("Inside User Register Controller");

    // Destructure the required fields from the request body
    const { username, email, password } = req.body;

    // Input validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Username, email, and password are required." });
    }

    try {
        // Check if the user already exists based on email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Account Already Exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profile: "", // Default profile value
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: "Account Created Successfully" });
        userId: newUser._id;
        console.log(newUser._id)
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get user details (optional, if needed)
exports.getUserDetails = async (req, res) => {
    console.log("Inside User Details Controller");
    // Implement logic to retrieve user details if needed
    res.status(200).json({ message: "Get User Details" });
};
