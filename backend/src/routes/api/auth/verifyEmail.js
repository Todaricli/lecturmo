import express from 'express';
import { User } from '../../../schemas/userSchema.js';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { sendVerificationMail } from '../../../utils/sendVerificationEmail.js';
import { authenticate } from '../../../middleware/authMW.js';

const router = express.Router();

/**
 * if user decided to verify, frontend should axios.post(..blabla.../verify-Uni-Email)
 * rememeber to pass a email into body such that axios.post(url(..blabla.../verify-Uni-Email), email)
 * currently only make auckland uni as only choice
 */
router.post('/verify-uni-email', authenticate, async (req, res) => {
  const user = req.user;
  const { email } = req.body;

  if (!validator.isEmail(email))
    return res.status(400).json('Please provide valid email.');

  const validStr = '@aucklanduni.ac.nz';
  const emailStr = email.toString();
  const atTheRate = emailStr.indexOf('@');

  if (!validStr === emailStr.substr(atTheRate))
    return res.status(400).json('Invalid University Email');

  sendVerificationMail(user, emailStr);

  return res.status(200).json('EMAIL SENT');
});

/**
 * as once user in the verifyEmail frontend route, it will called this route below
 * and compare the emailToken with the one in database
 */
router.post('/verify-email-token', async (req, res) => {
  try {
    const emailToken = req.body.emailToken;

    if (!emailToken) return res.status(404).json('Email Token not found');

    const user = await User.findOne({ emailToken });

    if (user) {
      // user.emailToken = null;
      user.isVerified = true;

      await user.save();

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user?.isVerified,
      });
    } else {
      res.status(404).json({ message: 'Email verification failed' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
});

export default router;
