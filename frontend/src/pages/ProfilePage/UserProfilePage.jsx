import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Paper,
  InputBase,
  CircularProgress,
} from '@mui/material';
import React, { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';
import { useRedirectToLoginIfNotLoggedIn } from '../../hooks/useRedirectToLoginIfNotLoggedIn';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Loading from '../../components/Loading';

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  useRedirectToLoginIfNotLoggedIn();

  if (user === null) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        marginTop: '50px',
        bgcolor: 'primary.main',
        height: '100vh',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 5,
      }}
    >
      <IconButton
        sx={{ marginTop: 3, marginLeft: 3 }}
        color="initial"
        component={Link}
        to="/"
      >
        <ArrowBackIcon />
      </IconButton>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: 600 }}>
          <Card
            sx={{
              padding: '10px',
              display: 'flex',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CardMedia
              component="img"
              title="profile img"
              image={user.avatarPicture}
              sx={{ width: 180, height: '230px', borderRadius: 4 }}
            />
            <CardContent>
              <Typography
                variant="h3"
                color="initial"
                sx={{ paddingBottom: '10px' }}
              >
                {user.fname} {user.lname}
              </Typography>
              <Typography variant="body2" color="#78858F">
                Email
              </Typography>
              <Typography variant="subtitle2" color="initial">
                {user.email}
              </Typography>
              <Typography variant="body2" color="#78858F">
                Date of Birth
              </Typography>
              <Typography variant="subtitle2" color="initial">
                {new Date(user.dob).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="#78858F">
                Gender
              </Typography>
              <Typography variant="subtitle2" color="initial">
                {user.gender}
              </Typography>
              <Typography variant="body2" color="#78858F">
                Rank
              </Typography>
              <Typography variant="subtitle2" color="initial">
                {user.rank}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ width: 600, marginTop: 5, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" color="initial">
              Bio
            </Typography>
            <Typography variant="body2" color="initial">
              {user.profileDescription}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ width: 600, marginTop: 5, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" color="initial">
              Links
            </Typography>
            <CardActions sx={{ paddingLeft: 0 }}>
              <IconButton aria-label="twitter" sx={{ border: '2px solid' }}>
                <TwitterIcon />
              </IconButton>
              <IconButton aria-label="linkedin" sx={{ border: '2px solid' }}>
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="facebook" sx={{ border: '2px solid' }}>
                <FacebookIcon />
              </IconButton>
              <IconButton aria-label="instagram" sx={{ border: '2px solid' }}>
                <InstagramIcon />
              </IconButton>
            </CardActions>
          </CardContent>
        </Card>

        {!user.isVerified && (
          <Card sx={{ width: 600, marginTop: 5, borderRadius: 4 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" color="initial">
                Resend email verification
              </Typography>
              <Paper
                component="form"
                sx={{
                  boxShadow: 'none',
                  bgcolor: 'grey.main',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <InputBase
                  placeholder="Enter your email"
                  value={user.email}
                  sx={{ padding: 1 }}
                />
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <EmailIcon />
                </IconButton>
              </Paper>
            </CardContent>
          </Card>
        )}

        <Button
          variant="contained"
          color="secondary"
          sx={{ marginTop: 5, borderRadius: 4 }}
          component={Link}
          to="/edit-profile"
        >
          Edit profile
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
