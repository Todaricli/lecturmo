import express from 'express';
import {
  checkUsername,
  checkEmail,
  checkPasswordInput,
  checkPasswordsMatch,
} from '../../controllers/registerController.js';
import { comparePassword } from '../../utils/useBcrypt.js';

const router = express.Router();

router.post('/update-user', async (req, res) => {
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
    emailToken,
    currentPassword,
  } = req.body;

  // Validate current password
  const isCurrentPasswordValid = comparePassword(currentPassword, req.user.password);
  if (!isCurrentPasswordValid) {
    return res.status(403).json({ message: 'Current password is invalid.' });
  }

  // Prepare update data
  const updateData = {};
  if (username && (username === req.user.username || await checkUsername(username))) updateData.username = username;
  if (email && (email === req.user.email || await checkEmail(email))) updateData.email = email;
  if (password && checkPasswordsMatch(password, confirmPassword)) {
    updateData.password = password;
  }
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (gender) updateData.gender = gender;
  if (avatarURL) updateData.avatarURL = avatarURL;
  if (verifyEmail) updateData.verifyEmail = verifyEmail;
  if (emailToken) updateData.emailToken = emailToken;

  try {
    console.log("updateData:", updateData)
    const user = await updateUser(updateData);
    
    res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(400).json({message: e.message});
  }
});


export default router;
