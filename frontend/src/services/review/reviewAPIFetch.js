import { postRequest } from '../postRequest';

export const addReview = async (courseId, formData,) => {
  
  const res = await postRequest(
    `http://localhost:3000/api/add-review?courseId=${courseId}`,
    formData
  );
  return res;
};
