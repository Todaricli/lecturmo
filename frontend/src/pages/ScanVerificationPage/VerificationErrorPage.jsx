import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { css } from '@emotion/css';
import { useMediaQuery } from 'react-responsive';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';


const VerificationErrorPage = () => {
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
    color: 'red', // Keep the color as green
  };

  const titleStyle = {
    padding: isMobile ? '5%' : '20px', // Adjust padding for mobile and non-mobile screens
    fontSize: isMobile ? '6vw' : '24px', // Adjust font-size based on viewport width
    color: 'red',
    fontWeight: 'bold',
  };

  const contentStyle = {
    padding: isMobile ? '5%' : '20px', // Adjust padding for mobile and non-mobile screens
    marginBottom: '20px',
    fontSize: isMobile ? '3.5vw' : '15px', // Adjust font-size based on viewport width
    color: 'red',
  };

  return (
    <div className={css(backgroundStyle)} data-testid="background-container">
      <div className={css(containerStyle)}>
      <HighlightOffIcon data-testid="error-icon"/>
      

        <p className={css(titleStyle)} data-testid="error-title">ERROR!</p>
        <p className={css(contentStyle)} data-testid="error-content">We couldn't process your request.</p>

        <Button variant="contained" color="error" data-testid="try-again-button">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default VerificationErrorPage;
