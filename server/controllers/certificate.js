
const express = require('express');
const certificateRouter = express.Router();
const Certificate = require('../models/Certificate'); // Model implementation required
const { generatePDF } = require('../utils/pdf');

certificateRouter.get('/:id', async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });
    if (certificate) {
        generatePDF(certificate,res);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving certificate' });
  }
});

module.exports = certificateRouter;
