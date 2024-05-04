import { useNavigate } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextProvider';

export const useRedirectToLoginIfNotLoggedIn = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToLoginIfNotLoggedIn = () => {
      if (!user) {
        navigate('/login');
      }
    };

    redirectToLoginIfNotLoggedIn();
  }, [navigate, user]);
};
