import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Input = (props) => {
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', color: '#0000' },
      }}
      noValidate
      autoComplete='off'
    >
      <div>
        <TextField
          required
          id='outlined-required'
          label={props.label}
          type={props.type}
          defaultValue={props.defaultValue}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </Box>
  );
};

export default Input;
