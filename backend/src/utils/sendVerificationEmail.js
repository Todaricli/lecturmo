import { createMailTransporter } from './createMailTransporter.js';

import dotenv from 'dotenv';
dotenv.config();

const FRONTEND_URL = process.env.CLIENT_URL ?? '';

/**
 * send a email based to email that passed in.
 * @param {*} user
 * @param {*} email
 */
export const sendVerificationMail = (user, email) => {
  const transporter = createMailTransporter();

  const mailOptions = {
    from: '"Lecturmon" <lecturmon.officials@outlook.com>',
    to: email,
    subject: 'Verify Your University Email:',
    html: `
      <h1>Welcome to Lecturmon, ${user.username}!</h1>
      <p>We're excited to have you on board. Before you can start using all our features, we need to verify your email address.</p>
      <p>Please click the link below to verify your email:</p>
      <a href='${FRONTEND_URL}/verifyEmail?emailToken=${user.emailToken}'>Verify Your Email</a>
      <p>If you didn’t ask to verify this address, you can ignore this email.</p>
      <p>Thanks,</p>
      <p>Your Lecturmon Team</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent');
    }
  });
};
