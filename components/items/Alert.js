import * as React from 'react';
import PropTypes from 'prop-types';

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
        sx={{ mt: 2, mb: 2 }}
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

RemovableAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}