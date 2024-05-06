import React from 'react'
import { TextField } from '@mui/material'

const ConfirmPasswordField = ({ value, error, onChange }) => {
  return (
    <TextField
      required
      fullWidth
      name="confirmPassword"
      label="Confirm Password"
      type="password"
      value={value}
      onChange={onChange}
      error={Boolean(error)}
      helperText={error}
    />
  )
}

export default ConfirmPasswordField