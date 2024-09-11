import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendTicketEmail = async (Email, eventName, pdfUrls) => {
  try {
    const pdfUrlText = Array.isArray(pdfUrls)
      ? pdfUrls.map((url, index) => `${index + 1}. ${url}`).join('\n')
      : pdfUrls;  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: `Your Tickets for ${eventName}`,
      text: `Here are your ticket links for the event "${eventName}":\n\n${pdfUrlText}\n\nPlease keep them safe.`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Tickets email sent successfully to ${Email} for event ${eventName}`);
  } catch (error) {
    console.error('Failed to send ticket email:', error.message);
    throw new Error('Email could not be sent');
  }
};
