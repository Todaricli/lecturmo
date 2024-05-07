import { postRequest } from '../postRequest';

export const updateUser = async (formData) => {
  const res = await postRequest(
    'http://localhost:3000/api/update-user',
    formData
  );
  return res;
};
