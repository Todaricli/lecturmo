import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

export const useRedirectToLoginIfNotLoggedIn = () => {
  const { user, fetchUserDetails, isUpdateUserLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const checkUser = useCallback(async () => {
    await fetchUserDetails();
    if (user === null && !isUpdateUserLoading) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);
};
