import { useNavigate } from 'react-router-dom';
import { useEffect, useContext, useCallback, useState } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

export const useRedirectToLoginIfNotLoggedIn = () => {
  const { user, fetchUserDetails, isUpdateUserLoading } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [fetchedUserDetails, setFetchedUserDetails] = useState(false);

  const checkUser = useCallback(async () => {
    await fetchUserDetails();
    setFetchedUserDetails(true);
  }, [fetchUserDetails]);

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  useEffect(() => {
    if (fetchedUserDetails && user === null && !isUpdateUserLoading) {
      navigate('/login');
    }
  }, [user, isUpdateUserLoading, navigate, fetchedUserDetails]);
};