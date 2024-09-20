const mongoose = require('mongoose');

// Define the schema for the certificate
const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true,  // Ensure each certificate ID is unique
  },
  studentName: {
    type: String,
    required: true,
  },
  internshipDomain: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

// Create the model
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
