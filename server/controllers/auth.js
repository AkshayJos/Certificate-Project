
const express = require('express');
const authRouter = express.Router();

const validUsername = 'admin'; // Set your username
const validPassword = '1234'; // Set your password

authRouter.post('/auth', async(req, res) => {
  console.log("Hello")
const { username, password } = req.body;
if (username === validUsername && password === validPassword) {
  res.json({ success: true });
} else {
  res.json({ success: false });
}
})

module.exports = authRouter;
