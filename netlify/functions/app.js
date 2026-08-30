const express = require('express');
const serverless = require('serverless-http');

// Express app initialize karein
const app = express();

// Middleware & Routes
app.use(express.json());

// Sample Route / Lead Management API Route
app.get('/', (req, res) => {
  res.send('Lead Management System API is running on Netlify!');
});

// Main Express app file ko require kar rahe hain (agar root par server.js ya app.js hai)
// const mainApp = require('../../server'); 

module.exports.handler = serverless(app);