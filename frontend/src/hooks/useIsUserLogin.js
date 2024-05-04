import { useState, useEffect } from 'react';

export const useIsUserLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      try {
        const res = await getUserDetails();
        console.log("res:", res)
        setIsLoggedIn(res.status !== 401);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkIfUserIsLoggedIn();
  }, [isLoggedIn]);

  return [isLoggedIn, setIsLoggedIn];
};
