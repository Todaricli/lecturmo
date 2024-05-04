import { useFetchUserDetails } from '../services/auth/useFetchUserDetails';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useRedirectToLoginIfNotLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToLoginIfNotLoggedIn = async () => {
      const res = await useFetchUserDetails();
      const isLoggedIn = res.status !== 401;
      if (!isLoggedIn) {
        navigate('/login');
      }
    };

    redirectToLoginIfNotLoggedIn();
  }, [navigate]);
};
