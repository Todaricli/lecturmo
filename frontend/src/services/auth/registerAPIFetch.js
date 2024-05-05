import { getRequest } from "../getRequest";
import { postRequest } from "../postRequest";

export const checkIfUserExists = async (body) => {
  const res = await postRequest('http://localhost:3000/api/auth/register/check-username', body)
  console.log("res2:", res)
  return res;
}