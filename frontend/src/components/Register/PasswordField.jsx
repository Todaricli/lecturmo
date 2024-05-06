import React from 'react';
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({
  showPassword,
  formData,
  handleChange,
  passwordError,
  handleClickShowPassword,
  handleMouseDownPassword,
}) => {
  return (
    <FormControl fullWidth required variant="outlined">
      <InputLabel htmlFor="password">Password</InputLabel>
      <OutlinedInput
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        error={Boolean(passwordError)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      <FormHelperText style={{ color: '#d74343' }}>
        {passwordError}
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
