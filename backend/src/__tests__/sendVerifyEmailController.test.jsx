import { describe, test, expect, vi } from 'vitest';
import { sendVerifyUniEmail} from '../utils/sendVerificationEmail.js';
import {verifyEmailToken } from '../controllers/sendVerifyEmailController.js';
import { User } from '../schemas/userSchema.js';

describe('Email Verification', () => {
  const user = { _id: 'userId', username: 'testuser', email: 'test@aucklanduni.ac.nz', isVerified: false };
  const emailToken = 'testEmailToken';

  test('Send verification email for university email', async () => {
    const sendVerificationMailMock = vi.mock();
    await sendVerifyUniEmail(user, user.email);
    expect(sendVerificationMailMock).toHaveBeenCalledWith(user, user.email);
  });

  test('Verify email token', async () => {
    const findOneSpy = vi.spyOn(User, 'findOne').mockResolvedValue(user);
    const verifiedUser = await verifyEmailToken(emailToken);
    expect(verifiedUser).toEqual({
      _id: user._id,
      username: user.username,
      email: user.email,
      isVerified: true,
    });
    findOneSpy.mockRestore();
  });
});
