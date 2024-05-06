import {
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Paper,
  InputBase,
} from '@mui/material';
import React, { useContext } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
        marginBottom: '50px',
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
              sx={{ width: 250, height: 250, borderRadius: 4 }}
            />
            <CardContent>
              <Typography
                variant="h3"
                color="initial"
                sx={{ paddingBottom: '10px', display: 'flex', alignItems: 'center' }}
              >
                {user.fname} {user.lname}
               
              </Typography>
              {user.isVerified &&
                  <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
                    <CheckCircleIcon style={{ color: 'green' }} />
                    <Typography variant="body2" color="text.secondary" sx={{ marginLeft: '5px' }}>
                      Verified
                    </Typography>
                  </Box>
                }
              <Typography variant="body2" color="#78858F" marginTop={5}>
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
                {`${user.gender.charAt(0).toUpperCase()}${user.gender.slice(1).toLowerCase()}`}
              </Typography>
              <Typography variant="body2" color="#78858F">
                Rank
              </Typography>
              <Typography variant="subtitle2" color="initial">
                {`${user.rank.charAt(0).toUpperCase()}${user.rank.slice(1).toLowerCase()}`}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Card sx={{ width: 600, marginTop: 5, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h6" color="initial">
              About
            </Typography>
            <Typography variant="body2" color="initial">
              {user.profileDescription}
            </Typography>
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
          sx={{ marginTop: 5, borderRadius: 4, marginBottom: 5}}
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
