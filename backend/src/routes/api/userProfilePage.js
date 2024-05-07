import express from 'express';
import {
  checkUsername,
  checkEmail,
  checkPasswordsMatch,
} from '../../controllers/registerController.js';
import { comparePassword, hashPassword } from '../../utils/useBcrypt.js';
import { updateUser } from '../../controllers/userProfileController.js';

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
    description,
    currentPassword,
  } = req.body;

  // Validate current password
  const isCurrentPasswordValid = await comparePassword(
    currentPassword,
    req.user.password,
  );
  console.log('isCurrentPasswordValid:', isCurrentPasswordValid);
  if (!isCurrentPasswordValid) {
    return res.status(403).json({ message: 'Current password is invalid.' });
  }

  // Prepare update data
  const updateData = {};
  if (
    username &&
    (username === req.user.username || (await checkUsername(username)))
  )
    updateData.username = username;
  if (email && (email === req.user.email || (await checkEmail(email))))
    updateData.email = email;
  if (password && checkPasswordsMatch(password, confirmPassword)) {
    console.log('password:', password);
    updateData.password = await hashPassword(password);
  }
  if (firstName) updateData.fname = firstName;
  if (lastName) updateData.lname = lastName;
  if (description) updateData.profileDescription = description;
  if (gender) updateData.gender = gender;
  if (avatarURL) updateData.avatarPicture = avatarURL;

  try {
    const user = await updateUser(req.user._id, updateData);
    res
      .status(200)
      .json({ message: 'Profile successfully updated', user: user });
  } catch (e) {
    console.log(e.message);
    res.status(400).json({ message: e.message });
  }
});

export default router;
