import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/css';
import { useMediaQuery } from 'react-responsive';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
const VerificationSuccessPage = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 }); // Define your mobile breakpoint here

  const containerStyle = {
    padding: '20px',
    backgroundColor: 'white',
    height: '70vh',
    width: '70vw',
    borderRadius: '25px',
    boxShadow: '5px 10px 2px 1px #003B6D',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  };

  const backgroundStyle = {
    backgroundColor: 'darkBlue',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const iconStyle = {
    padding: isMobile ? '5%' : '20px', // Adjust padding for mobile and non-mobile screens
    fontSize: isMobile ? '15vw' : '40px', // Adjust font-size based on viewport width
    color: 'green', // Keep the color as green
  };

  const titleStyle = {
    padding: isMobile ? '5%' : '20px', // Adjust padding for mobile and non-mobile screens
    fontSize: isMobile ? '6vw' : '24px', // Adjust font-size based on viewport width
    color: 'green',
    fontWeight: 'bold',
  };

  const contentStyle = {
    padding: isMobile ? '5%' : '20px', // Adjust padding for mobile and non-mobile screens
    marginBottom: '20px',
    fontSize: isMobile ? '3.5vw' : '15px', // Adjust font-size based on viewport width
    color: 'green',
  };

  return (
    <div className={css(backgroundStyle)}>
      <div className={css(containerStyle)}>
      <CheckCircleOutlineIcon />
        <p className={css(titleStyle)}>SUCCESS!</p>
        <p className={css(contentStyle)}>
          Congrats! You have attended the lecture!
        </p>

        <Button variant="contained" color="success">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default VerificationSuccessPage;
