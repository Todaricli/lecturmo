import React from 'react';
import { TextField } from '@mui/material';

const ConfirmPasswordField = ({ value, error, onChange, label="Confirm Password", required=true }) => {
  return (
    <TextField
      required={required}
      fullWidth
      name="confirmPassword"
      label={label}
      type="password"
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default ConfirmPasswordField;
