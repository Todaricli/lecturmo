import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Avatar,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Link as RouterLink,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, Link } from 'react-router-dom';
import UsernameField from '../../components/Register/UsernameField';
import PasswordField from '../../components/Register/PasswordField';
import ConfirmPasswordField from '../../components/Register/ConfirmPasswordField';
import EmailField from '../../components/Register/EmailField';
import VerifyEmailCheckbox from '../../components/Register/VerifyEmailCheckbox';
import GenderSelect from '../../components/Register/GenderSelect';
import {
  checkIfUserExists,
  checkEmailInput,
  checkPasswordInput,
  checkPasswordsMatch,
} from '../../services/auth/registerAPIFetch';
import dayjs from 'dayjs';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContextProvider';
import Loading from '../../components/Loading';

const EditProfilePage = () => {
  const {user} = useContext(AuthContext);

  if (user === null) {
    return <Loading />;
  }


  const [updateError, setUpdateError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    password: '',
    confirmPassword: '',
    email: user.email,
    verifyEmail: user.isVerified,
    firstName: user.fname,
    lastName: user.lname,
    gender: user.gender,
    dateOfBirth: dayjs(user.dob),
    avatarURL: user.avatarPicture,
    description: user.profileDescription,
  });
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = async (event) => {
    const { name, value, checked, type } = event.target;
    setUpdateError('');
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      if (name === 'username') {
        const res = await checkIfUserExists({ username: value });
        setUsernameError(res && res.error ? res.message : '');
      } else if (name === 'email') {
        const res = await checkEmailInput({
          email: value,
          verifyEmail: formData.verifyEmail,
        });
        setEmailError(res && res.error && value.length > 0 ? res.message : '');
      } else if (name === 'password') {
        const res1 = await checkPasswordInput({ password: value });
        setPasswordError(
          res1 && res1.error && value.length > 0 ? res1.message : ''
        );
        const res2 = await checkPasswordsMatch({
          password: value,
          confirmPassword: formData.confirmPassword,
        });
        setConfirmPasswordError(
          res2 && res2.error && formData.confirmPassword.length > 0
            ? res2.message
            : ''
        );
      } else if (name === 'confirmPassword') {
        const res = await checkPasswordsMatch({
          password: formData.password,
          confirmPassword: value,
        });
        setConfirmPasswordError(
          res && res.error && value.length > 0 ? res.message : ''
        );
      } else if (name === 'verifyEmail') {
        setFormData((prevData) => ({ ...prevData, verifyEmail: checked }));
        const res = await checkEmailInput({
          email: formData.email,
          verifyEmail: checked,
        });
        setEmailError(res && res.error && formData.email.length > 0 ? res.message : '');
      }
    }, 500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const res = await updateUserProfile(user._id, formData);
    // setUpdateError(res && res.error ? res.message : '');
    // if (!res.error) {
    //   navigate('/profile');
    // }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleAvatarChange = () => {
    // Logic for changing the avatar URL, possibly with a file input dialog.
    console.log("Avatar change clicked");
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'secondary.main',
          marginTop: 5,
          borderTopLeftRadius: 7,
          borderTopRightRadius: 7,
          position: 'relative',
        }}
      ></Box>
      <Container
        sx={{
          bgcolor: 'primary.main',
          zIndex: 10,
          top: 200,
          width: 600,
          height: 'fit-content',
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Box>
          <IconButton color="initial" component={RouterLink} to="/profile">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <Avatar
              alt="avatar"
              src={formData.avatarURL}
              sx={{ width: 150, height: 150 }}
            />
            <IconButton
              aria-label="edit avatar"
              onClick={handleAvatarChange}
              sx={{
                position: 'absolute',
                left: '100px',
                top: '110px',
                bgcolor: 'light.main',
              }}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <GenderSelect
                value={formData.gender}
                onChange={handleGenderChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={4}
                sx={{ width: '100%' }}
                label="Description"
                name="description"
                variant="filled"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            {/* Security Settings */}
            <Grid item xs={12}>
              <UsernameField
                value={formData.username}
                error={usernameError}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordField
                showPassword={showPassword}
                formData={formData}
                handleChange={handleChange}
                passwordError={passwordError}
                handleClickShowPassword={handleClickShowPassword}
                handleMouseDownPassword={handleMouseDownPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <ConfirmPasswordField
                value={formData.confirmPassword}
                error={confirmPasswordError}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <EmailField
                value={formData.email}
                error={emailError}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <VerifyEmailCheckbox
                checked={formData.verifyEmail}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={
              usernameError !== '' ||
              emailError !== '' ||
              passwordError !== '' ||
              confirmPasswordError !== ''
            }
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: 2,
              bgcolor: 'rgb(255,207,96)',
              color: '#808080',
              '&:hover': {
                bgcolor: 'rgb(255,199,71)',
                color: '#382e7f',
              },
            }}
          >
            Update Profile
          </Button>
          {updateError && (
            <Typography color="error" align="center">
              {updateError}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default EditProfilePage;
