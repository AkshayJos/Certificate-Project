const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const xlsx = require('xlsx');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const uploadFileRouter = require('./controllers/saveData');
const authRouter = require('./controllers/auth');
const certificateRouter = require('./controllers/certificate');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

const mongoURI = ''; 

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.log('Failed to connect to MongoDB Atlas', err));

app.use('/api/login',authRouter);   // /api/login/auth
app.use('/api',uploadFileRouter);  // /api/upload

// app.use('/api', multer({ dest: 'uploads/' }).single('file'), (req, res) => {

//   const workbook = xlsx.readFile(req.file.path);
//   const sheet = workbook.Sheets[workbook.SheetNames[0]];
//   const data = xlsx.utils.sheet_to_json(sheet);


//   res.json({ message: 'File processed successfully' });
// });
app.use('/api/certificate', certificateRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
