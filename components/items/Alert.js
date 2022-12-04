import * as React from 'react';

import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

export default function RemovableAlert({ text, open, onClick }) {
  return (
    <Collapse in={open}>
      <Alert
        variant='filled'
        severity='error'
        sx={{ mb: 2 }}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClick}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
        {text}
      </Alert>
    </Collapse>
  )
}