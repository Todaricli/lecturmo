import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function DatePickerValue({ value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Date of Birth"
          value={dayjs(value)}
          onChange={(newValue) => onChange(newValue)}
          sx={{
            '& .Mui-error': {
              color: '#666161',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#c4bbbb !important',
              borderWidth: '1px',
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
