import React from 'react';
import { TextField } from '@mui/material';

const EmailField = ({ value, error, onChange, required = true }) => {
  return (
    <TextField
      required={required}
      fullWidth
      id="email"
      label="Email Address"
      name="email"
      autoComplete="email"
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default EmailField;
