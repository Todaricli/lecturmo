import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContextProvider';

const VerifyEmail = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get('emailToken');
  console.log("emailToken:", emailToken)

  useEffect(() => {
    const process = async () => {
      try {
        setIsLoading(true);

        if (emailToken) {
          const justVerifiedUser = await axios
            .post(
              `http://localhost:3000/api/auth/verify-email-token`,
              { emailToken }
            )
            .then((response) => {
              setOpen(true);
              setTimeout(() => {
                navigate('/login', { replace: false });
              }, 6000);
              return response.data; // Return the response data
            })
            .catch((e) => alert(e));

          setUser(justVerifiedUser);
        }
      } catch {
        setError(true);
      }
    };

    process();
  }, [emailToken, navigate]);

  if (error) {
    alert('Error, verification failed!');
    return navigate('/login');
  }

  return (
    <>
      {isLoading ? (
        <div>"verifying...."</div>
      ) : (
        <div>
          {user?.isVerified ? (
            <div>Susccesfully verified, redireting...</div>
          ) : (
            <div>ERROR!!! {error.error ? error.message : 'unknown'}</div>
          )}
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Successfully verified!
        </Alert>
      </Snackbar>
    </>
  );
};

export default VerifyEmail;