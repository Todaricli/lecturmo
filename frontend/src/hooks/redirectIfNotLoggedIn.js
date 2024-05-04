import { isUserLoggedIn } from '../services/auth/isUserLogin';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const useRedirectToLoginIfNotLoggedIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToLoginIfNotLoggedIn = async () => {
      const isLoggedIn = await isUserLoggedIn()
      if (!isLoggedIn) {
        navigate('/login');
      }
    };

    redirectToLoginIfNotLoggedIn();
  }, [navigate]);
};
