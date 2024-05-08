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
  Link,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import UsernameField from '../../components/Register/UsernameField';
import PasswordField from '../../components/Register/PasswordField';
import ConfirmPasswordField from '../../components/Register/ConfirmPasswordField';
import EmailField from '../../components/Register/EmailField';
import GenderSelect from '../../components/Register/GenderSelect';
import Calendar from '../../components/Calendar';
import AvatarSelector from '../../components/Register/AvatarSelect';
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
import { useRedirectToLoginIfNotLoggedIn } from '../../hooks/useRedirectToLoginIfNotLoggedIn';
import { updateUser } from '../../services/profile/userProfileAPIFetch';
import { Snackbar, Alert } from '@mui/material';

const EditProfilePage = () => {
  const { user, updateUserDetails } = useContext(AuthContext);
  useRedirectToLoginIfNotLoggedIn();

  const [updateError, setUpdateError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState('');
  const [open, setOpen] = useState(false);
  const [isAvatarSelectorVisible, setIsAvatarSelectorVisible] = useState(false);


  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    verifyEmail: false,
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: dayjs(),
    avatarURL: '',
    description: '',
    currentPassword: '',
  });

  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // useEffect to initialize formData when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        password: '',
        confirmPassword: '',
        email: user.email,
        verifyEmail: false,
        firstName: user.fname,
        lastName: user.lname,
        gender: user.gender,
        dateOfBirth: dayjs(user.dob),
        avatarURL: user.avatarPicture,
        description: user.profileDescription,
        currentPassword: '',
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [user]);

  // forcefully update user state success message is opened
  useEffect(() => {
    if (open === true) {
      updateUserDetails();
    }
  }, [open]);

  if (user === null) {
    return <Loading />;
  }

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
        setUsernameError(
          res &&
            res.error &&
            formData.username != user.username &&
            value.length > 0
            ? res.message
            : ''
        );
      } else if (name === 'email') {
        const res = await checkEmailInput({
          email: value,
          verifyEmail: formData.verifyEmail,
        });
        console.log("formData.email:", formData.email)
        console.log("user.email:", user.email)
        setEmailError(
          res && res.error && value.length > 0 && value != user.email ? res.message : '');
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
        setEmailError(
          res &&
            res.error &&
            formData.email.length > 0 &&
            formData.email != user.email
            ? res.message
            : ''
        );
        console.log('user.email:', user.email);
      } else if (name === 'currentPassowrd') {
      }
    }, 500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('formData:', formData);
    const res = await updateUser(formData);
    setUpdateError(res && res.error ? res.message : '');
    if (!res.error) {
      // navigate('/profile');
      setOpen(true);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleClickShowCurrentPassword = () => {
    setShowCurrentPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleGenderChange = (event) => {
    setFormData({ ...formData, gender: event.target.value });
  };

  const handleDateOfBirthChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleAvatarChange = (avatarURL) => {
    setFormData({ ...formData, avatarURL: avatarURL });
    setIsAvatarSelectorVisible(false);
  };

  const handleCameraIconClick = () => {
    setIsAvatarSelectorVisible(true);
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
          marginBottom: '50px',
        }}
      >
        <Box>
          <IconButton
            color="initial"
            component={Link}
            href="/profile"
            sx={{ marginTop: 3 }}
          >
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
            }}
          >
            <Avatar
              alt="avatar"
              src={formData.avatarURL}
              sx={{ width: 150, height: 150 }}
            />
            {isAvatarSelectorVisible && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.9)', /* White background for the form with some transparency */
                zIndex: 1000,
              }}>
                <div style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  zIndex: 999,
                }}></div>

                <div style={{
                  zIndex: 1000,
                  width: '80%',
                  textAlign: 'center',
                  backgroundColor: 'white',
                  borderRadius: '10px',
                  padding: '20px',
                }}>
                  <AvatarSelector
                    value={formData.avatarURL}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            )}
            <IconButton
              aria-label="edit avatar"
              onClick={handleCameraIconClick}
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

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <PasswordField
                showPassword={showCurrentPassword}
                formData={formData}
                handleChange={handleChange}
                passwordError={currentPasswordError}
                handleClickShowPassword={handleClickShowCurrentPassword}
                label="Confirm Current Password"
                name="currentPassword"
              />
            </Grid>
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
              <Calendar
                value={formData.dateOfBirth}
                onChange={handleDateOfBirthChange}
              />
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
                required={false}
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
                label="New Password"
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <ConfirmPasswordField
                value={formData.confirmPassword}
                error={confirmPasswordError}
                onChange={handleChange}
                label="Confirm New Password"
                required={false}
              />
            </Grid>
            <Grid item xs={12}>
              <EmailField
                value={formData.email}
                error={emailError}
                onChange={handleChange}
                required={false}
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
            Successfully Updated Profile!
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default EditProfilePage;
