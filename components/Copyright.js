import * as React from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Copyright() {
  return (
    <Box sx={{
      backgroundColor: 'primary.main',
    }}>
    <Typography variant='body2' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/Nickanda'>
        Nicholas Yang
      </Link>{' '}
      {new Date().getFullYear()}.
      <br />
      <br />
    </Typography>
    </Box>
  );
}