const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../Models/userSchema");

// Register user
exports.register = async (req, res) => {
    // store the user details to DB
    console.log("Inside User Register");
    const { firstname,lastname,phonenumber,email, password,college,batch,year} = req.body;

    // Input validation
    if (!email || !password) {
        return res.status(400).json("Email and password are required");
    }

    try {
        // Check if the user already exists
        const existingUser = await users.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json("Account already exists");
        } else {
            console.log("User does not exist");

            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const newUser = new users({
                firstname: firstname,
                lastname: lastname,
                email: email,
                phonenumber:phonenumber,
                password: hashedPassword,  // Save hashed password
                college: college,
                batch: batch,
                year: year,
                profile: "",
            });

            await newUser.save();
            res.status(201).json("User registered successfully");
        }
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).json({ message: "Register request failed", error: err.message });
    }
};

//login
exports.login = async (req, res) => {
    console.log("Inside Login Controller");
    const { email, password } = req.body;

    try {
        // Find the user by email
        const existingUser = await users.findOne({ email: email });

        if (!existingUser) {
            return res.status(401).json("Invalid Email or Password");
        }

        // Compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if (!isMatch) {
            return res.status(401).json("Invalid Email or Password");
        }

        // Generate JWT token after successful login
        const token = jwt.sign({ userId: existingUser._id }, "userpwd123", { expiresIn: "1h" });

        console.log(token);

        res.status(200).json({
            data: existingUser,
            token: token,
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json("Internal Server Error");
    }
};
