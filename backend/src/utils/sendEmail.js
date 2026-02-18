import nodemailer from "nodemailer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  // try {
  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.SMTP_EMAIL,
  //       pass: process.env.SMTP_PASS,
  //     },
  //   });

  //   // check transporter
  //   await transporter.verify();
  //   console.log("✅ Transporter verified");

  //   await transporter.sendMail({
  //     from: `"AplusMart" <${process.env.SMTP_EMAIL}>`,
  //     to,
  //     subject,
  //     html,
  //   });

  //   console.log("✅ Email sent to:", to);
  // } catch (error) {
  //   console.error("❌ Email sending failed:", error);
  //   throw error;
  // }

  try {
    await resend.emails.send({
      from: "AplusMart <onboarding@resend.dev>",
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
