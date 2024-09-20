const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const Certificate = require('../models/Certificate');


const saveData = async(req,res) =>{
        try {
          // Check if the file was uploaded
          if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
          }
      
          // Load the uploaded Excel file
          const workbook = xlsx.readFile(req.file.path);
          
          // Assuming the first sheet contains the data
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          
          // Convert sheet data to JSON format
          const data = xlsx.utils.sheet_to_json(worksheet);
      
          // Iterate over each entry in the parsed data
          for (const entry of data) {
            const newCertificate = new Certificate({
              certificateId: entry['Certificate ID'],
              studentName: entry['Student Name'],
              internshipDomain: entry['Internship Domain'],
              startDate: new Date(entry['Start Date']),
              endDate: new Date(entry['End Date']),
            });
      
            // Save each certificate to the database
            await newCertificate.save();
          }
      
          res.status(200).json({ message: 'Certificates uploaded and saved successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error processing the file', error });
        }
      }


      module.exports = saveData;