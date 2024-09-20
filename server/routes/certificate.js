
const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate'); // Model implementation required
const { generatePDF } = require('../utils/pdf');

router.get('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ id: req.params.id });
    if (certificate) {
        generatePDF(certificate,res);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving certificate' });
  }
});

module.exports = router;
