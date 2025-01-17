import express from 'express';
import {
  checkUsername,
  checkEmail,
  checkPasswordInput,
  checkPasswordsMatch,
  registerUser,
} from '../../../controllers/registerController.js';
import validator from 'validator';
import { isValidUOAEmail } from '../../../controllers/registerController.js';
import { sendVerifyUniEmail } from '../../../controllers/sendVerifyEmailController.js';
import crypto from 'crypto';

const router = express.Router();

router.post('/register/check-username', async (req, res) => {
  try {
    const { username } = req.body;
    if (await checkUsername(username))
      return res.status(403).json({ message: 'Username already exists' });
    return res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/register/check-email', async (req, res) => {
  try {
    const { email, verifyEmail } = req.body;
    if (await checkEmail(email))
      return res.status(403).json({ message: 'Email already exists' });
    else if (verifyEmail) {
      if (!isValidUOAEmail(email)) {
        return res.status(403).json({
          message: 'Please provide valid University of Auckland email.',
        });
      }
    } else if (!validator.isEmail(email)) {
      return res.status(403).json({ message: 'Please provide valid email.' });
    }
    return res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
  }
});

router.post('/register', async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      avatarURL,
      verifyEmail,
    } = req.body;

    let emailToken;

    if (!username || !email || !password || !confirmPassword) {
      return res
        .status(403)
        .json({ message: 'All key credentials fields are required.' });
    }

    if (await checkUsername(username))
      return res.status(403).json({ message: 'Username already exists' });

    if (!checkPasswordInput(password)) {
      return res.status(403).json({
        message:
          'Password must be at least 5 characters long and contain at least one special character.',
      });
    }

    if (!checkPasswordsMatch(password, confirmPassword)) {
      return res.status(403).json({ message: 'Passwords do not match.' });
    }

    if (await checkEmail(email))
      return res.status(403).json({ message: 'Email already exists' });

    if (!isValidUOAEmail(email) && verifyEmail) {
      return res
        .status(403)
        .json({ message: 'Please provide valid University of Auckland email.' });
    }

    if (!validator.isEmail(email))
      return res.status(403).json({ message: 'Please provide valid email.' });


    if (verifyEmail) {
      // send email verification
      emailToken = crypto.randomBytes(32).toString('hex');
      const response = await sendVerifyUniEmail(
        { username: username, emailToken: emailToken },
        email,
      );
      if (response.status === 'error') {
        return res.status(403).json({ message: response.message });
      }
    }

    const user = await registerUser({
      username,
      email,
      password,
      firstName,
      lastName,
      gender,
      avatarURL,
      verifyEmail,
      emailToken,
    });

    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
  }
});

export default router;
