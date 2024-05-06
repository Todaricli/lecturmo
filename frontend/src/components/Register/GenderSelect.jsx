import React from 'react'
import {
  InputLabel,
  FormControl,
  MenuItem,
  Select,
} from '@mui/material';

const GenderSelect = ({ value, onChange }) => {
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id="gender-label">Gender</InputLabel>
      <Select
        labelId="gender-label"
        id="gender"
        value={value}
        onChange={onChange}
        label="Gender"
      >
        <MenuItem value="">Select Gender</MenuItem>
        <MenuItem value="male">Male</MenuItem>
        <MenuItem value="female">Female</MenuItem>
        <MenuItem value="other">Other</MenuItem>
      </Select>
    </FormControl>
  )
}

export default GenderSelect