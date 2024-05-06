import { useContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

/**
 * This page just to show how frontend can be implemented to verify user's email
 * without authContext, it is bit tedious.
 */
const VerifyEmail = () => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get('emailToken');

  useEffect(() => {
    const process = async () => {
      try {
        setIsLoading(true);

        const userFromSession = await axios.get(
          'http://localhost:3000/api/auth/status'
        );
        
        if (!userFromSession || userFromSession.status !== 201) return navigate('/login');

        setUser(userFromSession);

        if (user?.isVerified) {
          setTimeout(() => {
            return navigate('/');
          }, 3000);
        } else {
          if (emailToken) {
            const justVerifiedUser = await axios
              .post(
                `http://localhost:3000/api/reg//verify-email-token`,
                emailToken
              )
              .then(() => {
                alert('redirect to login in');
                navigate('/login', { replace: true });
              })
              .catch((e) => alert(e));

            setUser(justVerifiedUser);
          } else {
            setError(true)
            setIsLoading(false)
            alert('rediect to login in')
            navigate("/login")
          }
        }
      } catch {
        setError(true);
      }
    };

    process();

    if (error) {
      alert('Error, verification failed!');
      return navigate('/login');
    }
  });

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
    </>
  );
};

export default VerifyEmail;
