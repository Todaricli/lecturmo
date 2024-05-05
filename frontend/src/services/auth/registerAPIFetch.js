import { getRequest } from '../getRequest';
import { postRequest } from '../postRequest';

export const checkIfUserExists = async (body) => {
  const res = await postRequest(
    'http://localhost:3000/api/auth/register/check-username',
    body
  );
  return res;
};

export const checkEmailInput = async (body) => {
  const res = await postRequest(
    'http://localhost:3000/api/auth/register/check-email',
    body
  );
  return res;
};

export const checkPasswordInput = async (body) => {
  const { password } = body;

  const res = {};
  if (password.length < 5) {
    res.error = true;
    res.message = 'Password must be at least 5 characters long.';
    return res;
  }

  const specialCharacterRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  if (!specialCharacterRegex.test(password)) {
    res.error = true;
    res.message = 'Password must contain at least one special character.';
    return res;
  }
  return res;
};

export const checkPasswordsMatch = async (body) => {
  const { password, confirmPassword } = body;
  console.log("confirmPassword:", confirmPassword)
  console.log("password:", password)
  const res = {};
  if (password === confirmPassword) {
    res.message = "Passwords match.";
    res.error = false;
  } else {
    res.message = "Passwords do not match.";
    res.error = true;
  }
  
  return res;
};