import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Gmail transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465
      auth: {
        user: process.env.SMTP_EMAIL, // aplusmartbd247@gmail.com
        pass: process.env.SMTP_PASS,  // App Password
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"A Plus Mart BD" <${process.env.SMTP_EMAIL}>`,
      to: "aplusmartbd247@gmail.com", // where form data will be sent
      subject: `Contact Form: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Message sent successfully" });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

export default router;
