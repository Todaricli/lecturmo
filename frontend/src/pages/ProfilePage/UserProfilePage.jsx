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
  InputBase
} from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
  return (
    <Box
      sx={{
        marginTop: '50px',
        bgcolor: 'primary.main',
        height: '100vh',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 5
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
              image="/assets/dog.jpg"
              sx={{ width: 180, height: '230px', borderRadius: 4 }}
            />
            <CardContent>
              <Typography
                variant="h3"
                color="initial"
                sx={{ paddingBottom: '10px' }}
              >
                Sheldon Sheldon
              </Typography>
              <Typography variant="body2" color="#78858F">
                Email
              </Typography>
              <Typography variant="subtitle2" color="initial">
                Sheldon.S@gmail.com
              </Typography>
              <Typography variant="body2" color="#78858F">
                Date of Birth
              </Typography>
              <Typography variant="subtitle2" color="initial">
                December 27, 2024
              </Typography>
              <Typography variant="body2" color="#78858F">
                University
              </Typography>
              <Typography variant="subtitle2" color="initial">
                University of Auckland
              </Typography>
              <Typography variant="body2" color="#78858F">
                Gender
              </Typography>
              <Typography variant="subtitle2" color="initial">
                Female
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
              Lorem ipsum dolor sit amet, consectetur adipi scing elit. Tortor
              turpis sodales nulla velit. Nunc cum vitae, rhoncus leo id.
              Volutpat Duis tinunt pretium luctus pulvinar pretium.
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

        <Card sx={{ width: 600, marginTop: 5, borderRadius: 4 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" color="initial">
              Resend email verification
            </Typography>
            <Paper component="form" sx={{boxShadow: 'none', bgcolor: 'grey.main', display:'flex', justifyContent:'space-between'}}>
              <InputBase
                placeholder="Enter your email"
                sx={{padding: 1}}
              />
              <IconButton sx={{ p: "10px" }} aria-label="menu">
                <EmailIcon />
              </IconButton>
            </Paper>
          </CardContent>
        </Card>

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
