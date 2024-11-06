const Event = require('../Models/eventSchema');

// Create a new event
const createEvent = async (req, res) => {
  try {
    const {
      eventName,
      eventDescription,
      eventCategory,
      registrationDeadline,
      eventDate,
      eventTime,
      eventVenue
    } = req.body;

    // Get the uploaded poster file
    const poster = req.file;

    // Check if all required fields are provided
    if (!eventName || !eventDescription || !eventCategory || !registrationDeadline || !eventDate || !eventTime || !eventVenue) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if poster is uploaded
    if (!poster) {
      return res.status(400).json({ message: 'Event poster is required.' });
    }

    // Create a new event document with the uploaded poster URL
    const event = new Event({
      eventName,
      eventDescription,
      eventCategory,
      registrationDeadline,
      eventDate,
      eventTime,
      eventVenue,
      posterUrl: `/uploads/event-posters/${poster.filename}`  // Save the relative path of the uploaded image
    });

    await event.save();
    res.status(201).json({ message: 'Event created successfully!', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating event.' });
  }
};

// Get all events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching events.' });
  }
};

// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }
    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching the event.' });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById
};
