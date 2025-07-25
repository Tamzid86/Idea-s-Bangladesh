const express = require('express');
const Subscriber = require('../models/Subscriber'); 
const nodemailer = require('nodemailer');
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,      
    pass: process.env.SMTP_PASSWORD   
  }
});

router.post('/send-newsletter', async (req, res) => {
  const { subject, content } = req.body;
  if (!subject || !content) return res.status(400).json({ error: "Missing subject or content" });

  try {
    const subscribers = await Subscriber.find({}, 'email'); 
    const emails = subscribers.map(sub => sub.email);

    if (emails.length === 0) return res.status(400).json({ error: "No subscribers found" });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      bcc: emails,  
      subject,
      html: content
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, sent: emails.length });
  } catch (err) {
    console.error("Newsletter error:", err);
    res.status(500).json({ error: "Failed to send newsletter" });
  }
});

module.exports = router;
