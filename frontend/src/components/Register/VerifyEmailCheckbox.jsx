import React from 'react'
import {
  FormControlLabel,
  Checkbox,
} from '@mui/material';

const VerifyEmailCheckbox = ({ checked, onChange }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          name="verifyEmail"
          color="primary"
          checked={checked}
          onChange={onChange}
          sx={{
            '&.Mui-checked': {
              color: 'green',
            },
          }}
        />
      }
      label="Verify email is from University of Auckland."
    />
  )
}

export default VerifyEmailCheckbox