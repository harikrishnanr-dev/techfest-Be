// bookingSchema.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  bookingDate: { type: Date, default: Date.now }, // Date when the booking was made
  status: { type: String, enum: ['confirmed', 'pending', 'cancelled'], default: 'pending' },
  // Add other booking-related fields like payment status, ticket number, etc.
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
