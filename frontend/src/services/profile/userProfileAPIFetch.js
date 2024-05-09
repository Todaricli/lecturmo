import { postRequest } from '../postRequest';
const BASE_URL = import.meta.env.VITE_BACKEND_EXPRESS_APP_ENDPOINT_API_URL ?? 'http://localhost:3000/api';

export const updateUser = async (formData) => {
  const res = await postRequest(
    `${BASE_URL}/update-user`,
    formData
  );
  return res;
};


export const resendVerificationEmail = async (formData) => {
  const res = await postRequest(
    `${BASE_URL}/resend-verification-email`,
    formData
  );
  return res;
}