import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Box, Snackbar, Alert } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Footer from '../../components/Footer';
import Loading from '../../components/Loading';
import LandingPosts from '../../components/LandingPosts';
import SearchBar from '../../components/SearchBar';
import { preloadImages } from '../../services/preloadImages';

const BASE_URL =
  import.meta.env.VITE_BACKEND_EXPRESS_APP_ENDPOINT_API_URL ??
  'http://localhost:3000/api';

const HomePage = () => {
  const location = useLocation();
  const message = location.state?.message;

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [toggleSearch, setToggleSearch] = useState(false);

  const toggleSearchBar = () => {
    setToggleSearch(!toggleSearch);
  };

  useEffect(() => {
    document.addEventListener('mousedown', (e) => {
      // console.log(e.target)
    });
  }, []);

  useEffect(() => {
    if (message === 'Successfully verified!') {
      setOpen(true);
    }
  }, [message]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/landing-posts`);
        setPosts(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    const preloadAssets = async () => {
      const imageUrls = ['../../../FullLogo.png']; 
      await preloadImages(imageUrls);
    };

    const loadDataAndAssets = async () => {
      await Promise.all([fetchData(), preloadAssets()]);
      setInitialLoad(false);
    };

    loadDataAndAssets();
  }, []);

  return (
    <>
      {initialLoad ? (
        <Loading />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src="../../../FullLogo.png"
            sx={{ width: "60%" }}
          ></Box>
          <SearchBar toggle={toggleSearch} skeet="skeet" />
          <LandingPosts posts={posts} />
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
          >
            <Alert
              onClose={() => setOpen(false)}
              severity="success"
              sx={{ width: '100%' }}
            >
              Successfully verified!
            </Alert>
          </Snackbar>

          <Footer />
        </Box>
      )}
    </>
  );
};

export default HomePage;
