import { getUserDetails } from "./getUserDetails";

export const isUserLoggedIn = async () => {
  const res = await getUserDetails();
  const isLoggedIn = res.status !== 401
  return isLoggedIn
}