// bookingController.js
const Booking = require('../Models/bookingSchema');
const Event = require('../Models/eventSchema');
const User = require('../Models/userSchema');

const bookEvent = async (req, res) => {
  try {
    const { userId, eventId } = req.body;

    // Check if the user and event exist
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Create a new booking
    const newBooking = new Booking({
      userId: user._id,
      eventId: event._id,
    });

    // Save the booking to the database
    await newBooking.save();

    // Return success response
    res.status(201).json({ message: 'Event booked successfully', booking: newBooking });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while booking event.' });
  }
};

module.exports = { bookEvent };
