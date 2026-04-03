const express = require('express');
const router = express.Router();
const Query = require('../models/Query');
const auth = require('../middleware/auth'); 
const nodemailer = require('nodemailer'); // NEW

// NEW: Setup the email sender
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS  // Your Gmail App Password
  }
});

// 1. Application POST (PUBLIC - Sends Email)
router.post('/', async (req, res) => {
  try {
    const newQuery = new Query(req.body);
    const savedQuery = await newQuery.save();

    // NEW: Send the email notification
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends it to yourself
      subject: `New Query on NST Connect from ${req.body.senderName}`,
      html: `
        <h2>New Parent/Student Query</h2>
        <p><strong>Name:</strong> ${req.body.senderName}</p>
        <p><strong>Email:</strong> ${req.body.senderEmail}</p>
        <p><strong>Message:</strong></p>
        <p style="padding: 12px; background-color: #f1f5f9; border-radius: 8px;">${req.body.message}</p>
        <br/>
        <a href="https://nst-frontend.vercel.app/admin" style="background-color: #0f172a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to Admin Dashboard</a>
      `
    };

    // Send the email silently in the background
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json(savedQuery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Fetch all queries GET (PROTECTED)
router.get('/', auth, async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: -1 }); // Sorts newest first
    res.json(queries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Update Status PATCH (PROTECTED)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const updatedQuery = await Query.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedQuery);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Delete Query DELETE (PROTECTED)
router.delete('/:id', auth, async (req, res) => {
  try {
    await Query.findByIdAndDelete(req.params.id);
    res.json({ message: "Query deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;