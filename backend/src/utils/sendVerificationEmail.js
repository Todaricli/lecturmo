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
    html: `<p>Hi, 👋 ${user.username}, click the link below to verify:</p>
        <a href='${FRONTEND_URL}/verifyEmail?emailToken=${user.emailToken}'>Verify Your Email</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Verification email sent');
    }
  });
};
