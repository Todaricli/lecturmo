import { useEffect } from 'react';
import { createContext, useCallback, useState } from 'react';
import { getRequest } from '../services/getRequest';
import { postRequest } from '../services/postRequest';

export const AuthContext = createContext();
const BASE_URL =
  import.meta.env.EXPRESS_APP_ENDPOINT_API_URL ?? 'http://localhost:3000/api';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginUserError, setLoginUserError] = useState(null);
  const [isLoginUserLoading, setIsLoginUserLoading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [isUpdateUserLoading, setIsUpdateUserLoading] = useState(false);
  const [logoutUserError, setLogoutUserError] = useState(null);
  const [isLogoutUserLoading, setIsLogoutUserLoading] = useState(false);

  // Function to fetch user details if not already in memory
  const loginUser = useCallback(async (body) => {
    try {
      setIsLoginUserLoading(true);
      setLoginUserError(null);
      const res = await postRequest(`${BASE_URL}/auth/login`, body);
      await updateUserDetails();
      setIsLoginUserLoading(false);
      if (res.error) {
        return setLoginUserError(res);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoginUserLoading(false);
    }
  }, []);

  // Function to fetch user details if not already in memory
  const fetchUserDetails = useCallback(async () => {
    if (user) return; // If user exists, do nothing
    await updateUserDetails();
  }, [user]);

  useEffect(() => {
    console.log('Updated user:', user); // This will log updated user details
  }, [user]);

  // Function to update user details from the backend
  const updateUserDetails = useCallback(async () => {
    try {
      setIsUpdateUserLoading(true);
      setUpdateUserError(null);
      const res = await getRequest(`${BASE_URL}/auth/status`);
      setIsUpdateUserLoading(false);
      if (res.error) {
        return setUpdateUserError(res);
      }
      setUser(res); // Set user in context
    } catch (error) {
      console.error('Updating user details failed:', error);
      setIsUpdateUserLoading(false);
    }
  }, []);

  const logoutUser = async () => {
    try {
      setIsLogoutUserLoading(true);
      setLogoutUserError(null);
      const res = await getRequest(`${BASE_URL}/auth/logout`);
      setIsLogoutUserLoading(false);
      if (res.error) {
        return setLogoutUserError(res);
      }
      setUser(null); // delete user in memory
    } catch (error) {
      console.error('Logout user failed:', error);
      setIsLogoutUserLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoginUserLoading,
        loginUserError,
        isUpdateUserLoading,
        updateUserError,
        isLogoutUserLoading,
        logoutUserError,
        loginUser,
        fetchUserDetails,
        updateUserDetails,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
