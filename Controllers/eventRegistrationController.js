const EventRegistration = require('../Models/eventRegistrationSchema');

// Register for an event
exports.registerForEvent = async (req, res) => {
    console.log("Inside Event Registration Controller");

    // Destructure the required fields from the request body
    const { userId, firstName, lastName, branch, year, batch, eventId } = req.body;

    // Input validation
    if (!userId || !firstName || !lastName || !branch || !year || !batch || !eventId) {
        return res.status(400).json({ message: "All fields are required for event registration." });
    }

    try {
        // Check if the user is already registered for the event
        const existingRegistration = await EventRegistration.findOne({ userId, eventId });
        if (existingRegistration) {
            return res.status(400).json({ message: "User already registered for this event." });
        }

        // Create a new event registration
        const newRegistration = new EventRegistration({
            userId,
            firstName,
            lastName,
            branch,
            year,
            batch,
            eventId
        });

        // Save the registration to the database
        await newRegistration.save();
        res.status(201).json({ message: "Event Registered Successfully" });
    } catch (error) {
        console.error("Error during event registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get event registrations for a user (optional)
exports.getUserEventRegistrations = async (req, res) => {
    const userId = req.params.userId; // Assuming you're passing userId in the URL

    try {
        const registrations = await EventRegistration.find({ userId }).populate('eventId'); // Populate event details if needed
        res.status(200).json(registrations);
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
