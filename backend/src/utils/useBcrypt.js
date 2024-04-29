import bcrypt from 'bcrypt';

const saltRounds = 12;

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (plain, hashed) => {
  try {
    const match = await bcrypt.compare(plain, hashed);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};
