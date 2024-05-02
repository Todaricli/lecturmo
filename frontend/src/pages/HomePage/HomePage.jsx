import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Typography from '@mui/material/Typography';
import SearchBar from '../../components/SearchBar';
import LandingPosts from '../../components/LandingPosts';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Footer from '../../components/Footer';
import { useTheme } from '@emotion/react';
import { Box, IconButton } from '@mui/material';


const HomePage = () => {
  const theme = useTheme();

  const { user, fetchUserDetails, isFetchUserLoading, fetchUserError } = useContext(AuthContext);
  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  if (isFetchUserLoading) return <div>Loading...</div>;
  if (fetchUserError) return <div>Error: {JSON.stringify(fetchUserError)}</div>;

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography variant="h1">Hello Lectermo</Typography>
      <SearchBar />
      <LandingPosts />
      <IconButton
        sx={{
          bgcolor: 'secondary.main',
          width: '60px',
          height: '60px',
          borderRadius: 10,
          padding: '5px',
          marginTop: '70px',
          textAlign: 'center',
          boxShadow: theme.shadows[1],
        }}
        disableRipple={true}
      >
        <ArrowDownwardIcon sx={{ fontSize: 50 }} />
      </IconButton>

      <Footer />
    </Box>
  );
};

export default HomePage;
