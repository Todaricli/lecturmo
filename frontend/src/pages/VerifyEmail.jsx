import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContextProvider';

const VerifyEmail = () => {
  const { user, fetchUserDetails } =
    useContext(AuthContext);

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
            .post(
              `http://localhost:3000/api/auth/verify-email-token`,
              { emailToken }
            )
            .then(async (response) => {
              await fetchUserDetails();
              setHasFetchedUserDetails(true);
              return response.data;
            })
            .catch((e) => alert(e));
        }
      } catch (err) {
        console.log("err:", err)
        setError(true);
      }
    };

    process();
  }, [emailToken, navigate, user, fetchUserDetails]);

  useEffect(() => {
    if (hasFetchedUserDetails) {
      if (user) {
        navigate('/home', { state: { message: 'Successfully verified!' }, replace: true });
      } else {
        navigate('/login', { state: { message: 'Successfully verified!' }, replace: true });
      }
    }
  }, [user, navigate, hasFetchedUserDetails]);

  if (error) {
    console.log("error:", error)
    alert('Error, verification failed!');
    return navigate('/login');
  }

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress size={80} />
          <Typography variant="h6" mt={2}>
            Verifying...
          </Typography>
        </Box>
      ) : (
        <>
          {user?.isVerified ? (
            <Alert severity="success">Successfully verified, redirecting...</Alert>
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