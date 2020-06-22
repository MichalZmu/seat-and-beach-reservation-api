const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
  dateFrom: { type: Date, required: true },
  dateTo: { type: Date, required: true},
  seatNumber: { type: String, required: true},
  userId: { type: String},
  firstName: { type: String, required: true},
  lastName: { type: String, required: true},
  email: { type: String, required: true},
  phoneNumber: { type: String}
});

module.exports = mongoose.model('Reservation', reservationSchema);
