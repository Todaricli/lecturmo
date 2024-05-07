import React from 'react';
import { TextField } from '@mui/material';

const UsernameField = ({ value, error, onChange, required=true }) => {
  return (
    <TextField
      required={required}
      fullWidth
      id="username"
      label="Username"
      name="username"
      autoComplete="username"
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  );
};

export default UsernameField;
