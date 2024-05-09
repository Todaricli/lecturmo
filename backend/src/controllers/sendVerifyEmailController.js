import { User } from '../schemas/userSchema.js';
import { sendVerificationMail } from '../utils/sendVerificationEmail.js';

export async function sendVerifyUniEmail(user, email) {
  const validStr = '@aucklanduni.ac.nz';
  const emailStr = email.toString();
  const atTheRate = emailStr.indexOf('@');

  if (validStr !== emailStr.substr(atTheRate)) {
    return {
      status: 'error',
      message: 'Invalid University Email',
    };
  }

  try {
    await sendVerificationMail(user, emailStr);
    return {
      status: 'success',
      message: 'Verification email sent successfully',
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Failed to send verification email: ${error.message}`,
    };
  }
}

export async function verifyEmailToken(emailToken) {
  if (!emailToken) throw new Error('Email Token not found');

  const user = await User.findOne({ emailToken });

  if (user) {
    user.emailToken = null;
    user.isVerified = true;

    await user.save();

    return {
      _id: user._id,
      username: user.username,
      email: user.email,
      isVerified: user?.isVerified,
    };
  } else {
    throw new Error('Email verification failed');
  }
}
