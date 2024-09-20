const express = require('express');
const uploadFileRouter = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');

// Configure storage for Multer
const storage = multer.memoryStorage(); 

const fileFilter = (req, file, cb) => {
  // Define allowed MIME types
  const allowedMimeTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel' // .xls
  ];
  
  // Check if the MIME type is allowed
  const isMimeTypeAllowed = allowedMimeTypes.includes(file.mimetype);
  
  // Check the file extension as well
  const allowedExtensions = /xlsx|xls/;
  const hasValidExtension = allowedExtensions.test(file.originalname.toLowerCase());
  
  if (isMimeTypeAllowed && hasValidExtension) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only Excel files are allowed!'), false); // Reject the file
  }
};

// Create Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // 5MB file size limit
});

// Route to handle file upload
uploadFileRouter.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file);
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const entry of data) {
      const newCertificate = new Certificate({
        certificateId: entry['Certificate ID'],
        studentName: entry['Student Name'],
        internshipDomain: entry['Internship Domain'],
        startDate: entry['Start Date'],
        endDate: entry['End Date'],
      });

      await newCertificate.save();
    }

    res.status(200).json({ message: 'Certificates uploaded and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the file', error });
  }
});

module.exports = uploadFileRouter;
