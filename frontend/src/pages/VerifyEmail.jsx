import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContextProvider';
import Loading from '../components/Loading';

const BASE_URL = import.meta.env.VITE_BACKEND_EXPRESS_APP_ENDPOINT_API_URL ?? 'http://localhost:3000/api';

const VerifyEmail = () => {
  const { user, fetchUserDetails } = useContext(AuthContext);

  const [hasFetchedUserDetails, setHasFetchedUserDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get('emailToken');


  useEffect(() => {
    const process = async () => {
      try {
        setIsLoading(true);

        if (emailToken) {
          await axios
            .post(`${BASE_URL}/auth/verify-email-token`, {
              emailToken,
            })
            .then(async (response) => {
              await fetchUserDetails();
              setHasFetchedUserDetails(true);
              return response.data;
            })
            .catch((e) => {
              console.log('error:', e)
              alert(e.message);
              navigate('/home', {
                state: { message: 'Verfication Failed' },
              });
            });
        }
      } catch (err) {
        console.log('err:', err);
        setError(true);
      }
    };

    process();
  }, [emailToken, navigate, user, fetchUserDetails]);

  useEffect(() => {
    if (hasFetchedUserDetails) {
      if (user) {
        navigate('/home', {
          state: { message: 'Successfully verified!' },
          replace: true,
        });
      } else {
        navigate('/login', {
          state: { message: 'Successfully verified!' },
          replace: true,
        });
      }
    }
  }, [user, navigate, hasFetchedUserDetails]);

  if (error) {
    console.log('error:', error);
    alert('Error, verification failed!');
    return navigate('/login');
  }

  return (
    <>
      {isLoading ? (
        <Loading content="Verifying..." />
      ) : (
        <>
          {user?.isVerified ? (
            <Alert severity="success">
              Successfully verified, redirecting...
            </Alert>
          ) : (
            <Alert severity="error">
              ERROR!!! {error.error ? error.message : 'unknown'}
            </Alert>
          )}
        </>
      )}
    </>
  );
};

export default VerifyEmail;
