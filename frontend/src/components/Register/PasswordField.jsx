import React from 'react';
import {
  InputAdornment,
  IconButton,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormHelperText,
} from '@mui/material';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordField = ({
  showPassword,
  formData,
  handleChange,
  passwordError,
  handleClickShowPassword,
  handleMouseDownPassword,
  label = 'Password',
  name = 'password',
  required=true,
}) => {
  return (
    <FormControl fullWidth required={required} variant="outlined">
      <InputLabel htmlFor="password">{label}</InputLabel>
      <OutlinedInput
        id="password"
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={formData[name]}
        onChange={handleChange}
        error={Boolean(passwordError)}
        label={label}
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
      />
      <FormHelperText style={{ color: '#d74343' }}>
        {passwordError}
      </FormHelperText>
    </FormControl>
  );
};

export default PasswordField;
