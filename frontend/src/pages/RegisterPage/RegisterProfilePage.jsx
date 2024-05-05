import React, { useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Checkbox,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
  OutlinedInput,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Calendar from '../../components/Calendar';
import AvatarSelector from '../../components/AvatarSelect';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from '@mui/material/IconButton';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RegisterProfilePage() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password'),
      allowExtraEmails: data.get('allowExtraEmails'),
    });
  };

  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{
      marginTop: '50px',
      bgcolor: 'primary.main',

      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      paddingBottom: 5,
    }}>
      <IconButton
        sx={{ marginTop: 3, }}
        color="initial"
        component={Link}
        href='/register'
      >
        <ArrowBackIcon />
      </IconButton>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Almost There
        </Typography>
        <ThemeProvider theme={defaultTheme}>
          <Box
            component="form"
            fullWidth
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  id="firstName"
                  name="firstName"
                  autoComplete="first-name"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  InputProps={{
                    startAdornment: <InputAdornment position="start"></InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="gender-label" >Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    value={gender}
                    input={<OutlinedInput label="gender" />}
                    onChange={handleGenderChange}
                    autoComplete="gender"
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    {genderOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel id="dob-label" >Date of birth</InputLabel>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </FormControl>
              </Grid> */}
              <Grid item xs={12}>
                <Calendar />
              </Grid>
              <Grid item xs={12}>
                <AvatarSelector />
              </Grid>

            </Grid>


            <Button
              href='/register/verification'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 2, bgcolor: 'rgb(255,207,96)', color: '#382e7f', '&:hover': {
                bgcolor: 'rgb(255,199,71)',
              },}}
            >
              Register
            </Button>
          </Box>
        </ThemeProvider >
      </Box>
      <Copyright />
    </Container>

  );
}

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Already have an account? '}
      <Link href="/login" variant="body2" sx={{
        textDecoration: 'none', color: '#1C89B6', '&:hover': {
          textDecoration: 'underline',
          color: '#1c69b6',
        },
      }}>
        {'Sign in'}
      </Link>
    </Typography>
  );
}

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];
