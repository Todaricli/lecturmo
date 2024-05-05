import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';

export const useFetchUserDetails = () => {
  const { fetchUserDetails } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserDetails();
    };
    fetchData();
  }, [fetchUserDetails]);

  return userDetails;
};
