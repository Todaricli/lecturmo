import express from 'express';
import { User } from '../../../schemas/userSchema.js';
import validator from 'validator';
import crypto from 'crypto';
import { hashPassword } from '../../../utils/useBcrypt.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

/**
 * The first bit the jwt below just to try to think of a way to add a expire-data for the emailToken
 * or the link sent, will get back to it later
 */

// const createToken = (_id) => {
//     const jwtSecretKey = process.env.JWT_SECRET_KEY;

//     return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
// };

/**
 * check if the username is already exist
 */
router.post('/register/check-username', async (req, res) => {
  const { username } = req.body;
  const user = await User.find({ username });
  console.log("user:", user)
  if (user.length !== 0) return res.status(403).json({ message: 'Username already exists' }); //email or username taken.
  return res.sendStatus(200);
});

/**
 * Check if the email is already exist
 */
router.get('/register/check-email', async (req, res) => {
  const { email } = req.body;

  const user = await User.find({ email });
  if (user) return res.status(403).json({ message: 'Email already exists' });
  return res.sendStatus(200);
});

/**
 * register a user, add username, email, password in database
 *
 */
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(403).json('All key credentials fields are required.');
  }

  if (!validator.isEmail(email))
    return res.status(403).json('Please provide valid email.');

  // if (!validator.isStrongPassword(password))
  // return res.status(400).json("Password must be a strong password..");

  // console.log(req.body)
  // console.log(username);
  // console.log(password);
  // console.log(email)
  // const hashedPassword = await hashPassword(password);
  // console.log(hashedPassword)

  try {
    const user = new User({
      username: username,
      email: email,
      password: await hashPassword(password),
      emailToken: crypto.randomBytes(32).toString('hex'), // generate a emailToken for later comparison
    });

    await user.save();

    res
      .status(200)
      .json({
        _id: user._id,
        username: username,
        email: email,
        isVerified: user.isVerified,
      });
  } catch (e) {
    console.log(e.message);
  }
});

export default router;
