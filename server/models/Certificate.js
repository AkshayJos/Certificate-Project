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
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  certificateFile: {
    type: String,  // Path to the generated certificate file (optional)
    default: null,
  },
}, { timestamps: true });

// Create the model
const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;
