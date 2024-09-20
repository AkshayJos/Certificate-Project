const express = require('express');
const auth = require('./auth');
const saveData  = require('./saveData');
const multer = require('multer');
const router = require('express').Router();

router.post('/api/login',auth);

const upload = multer({ dest: 'uploads/' });
router.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (const entry of data) {
      const newCertificate = new Certificate({
        certificateId: entry['Certificate ID'],
        studentName: entry['Student Name'],
        internshipDomain: entry['Internship Domain'],
        startDate: new Date(entry['Start Date']),
        endDate: new Date(entry['End Date']),
      });
      await newCertificate.save();
    }

    res.status(200).json({ message: 'Certificates uploaded and saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing the file', error });
  }
});

module.exports = router;


