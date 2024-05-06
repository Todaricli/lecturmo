import { User } from '../schemas/userSchema.js';
import { hashPassword } from '../utils/useBcrypt.js';
import crypto from 'crypto';

export const isValidUOAEmail = (email) => {
  const aucklandUniEmailRegex = /^[^\s@]+@aucklanduni\.ac\.nz$/;
  return aucklandUniEmailRegex.test(email);
};

export const checkUsername = async (username) => {
  const user = await User.find({ username });
  return user.length !== 0;
};

export const checkEmail = async (email) => {
  const user = await User.find({ email });
  return user.length !== 0;
};

export const checkPasswordInput = (password) => {
  if (password.length < 5) {
    return false;
  }

  const specialCharacterRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!specialCharacterRegex.test(password)) {
    return false;
  }
  return true;
};

export const checkPasswordsMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

export const registerUser = async (userData) => {
  const { username, email, password, firstName, lastName, gender, avatarURL } = userData;

  const emailToken = crypto.randomBytes(32).toString('hex');
  console.log("emailToken:", emailToken)

  const user = new User({
    fname: firstName,
    lname: lastName,
    gender: gender,
    username: username,
    email: email,
    password: await hashPassword(password),
    avatarPicture: avatarURL,
    emailToken: emailToken,
  });

  await user.save();

  return {
    fname: firstName,
    lname: lastName,
    gender: gender,
    username: username,
    email: email,
    emailToken: emailToken,
  };
};