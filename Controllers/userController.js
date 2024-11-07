const bcrypt = require('bcrypt');
const User = require('../Models/userSchema');

// Register user
exports.register = async (req, res) => {
    console.log("Inside User Register Controller");

    // Destructure the required fields from the request body
    const { email, password, firstname, lastname, college, batch, year, phonenumber } = req.body;

    // Input validation
    if ( !email || !password || !firstname || !lastname || !college || !batch || !year || !phonenumber) {
        return res.status(400).json({ message: "All fields are required." });
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

        // Create a new user with the hashed password and other details
        const newUser = new User({
            email,
            password: hashedPassword,
            profile: "", // Default profile value
            firstname,
            lastname,
            college,
            batch,
            year,
            phonenumber
        });

        // Save the new user to the database
        await newUser.save();
        res.status(201).json({ message: "Account Created Successfully" });

        // Log the new user's ID for debugging
        console.log("New User ID:", newUser._id);
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
