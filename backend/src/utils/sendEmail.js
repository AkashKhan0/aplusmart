import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    // check transporter
    await transporter.verify();
    console.log("✅ Transporter verified");

    await transporter.sendMail({
      from: `"AplusMart" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    });

    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

export default sendEmail;
