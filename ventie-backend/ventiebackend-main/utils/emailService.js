//evenct creaion notifier

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Email Template
const eventEmailTemplate = (event) => `
<!DOCTYPE html>
<html>
<body>
  <h2>${event.eventName}</h2>
  <img src="${event.poster}" alt="Event Poster" style="width:300px;height:auto;"/>
  <p><strong>Date:</strong> ${event.date.toDateString()}</p>
  <p><strong>Time:</strong> ${event.time}</p>
  <p><strong>Venue:</strong> ${event.venue}</p>
  <p><strong>Guests:</strong> ${event.guest}</p>
  <p><strong>Description:</strong> ${event.description}</p>
</body>
</html>
`;

// Function to send event emails to all users
export const sendEventEmailToAllUsers = async (event, users) => {
  try {
    const emailPromises = users.map((user) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `New Event: ${event.eventName}`,
        html: eventEmailTemplate(event),
      };
      return transporter.sendMail(mailOptions);
    });

    await Promise.all(emailPromises);
    console.log('Event emails sent to all users successfully');
  } catch (error) {
    console.error('Failed to send event emails:', error.message);
    throw error;
  }
};
