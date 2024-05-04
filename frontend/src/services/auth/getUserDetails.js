import { getRequest } from "../getRequest";

export const getUserDetails = async () => {
  const res = getRequest("http://localhost:3000/api/auth/status")
  return res
};