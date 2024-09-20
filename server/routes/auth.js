
const express = require('express');
const router = express.Router();

const validUsername = 'admin'; // Set your username
const validPassword = '1234'; // Set your password

const auth = (req, res) => {
    console.log("Hello")
  const { username, password } = req.body;
  if (username === validUsername && password === validPassword) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

module.exports = auth;
