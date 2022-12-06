import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

export default function AntInfoDialog({ data, open, onClose}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='sm'
      fullWidth
      scroll='paper'
    >
      <DialogTitle>{data?.species} ({data?.caste})</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>
            <b>Species:</b> {data?.species}
          </Typography>
          <Typography>
            <b>Caste:</b> {data?.caste}
          </Typography>
          <Typography>
            <b>Feigns Death?</b> {data?.feignsDeath ? 'Yes' : 'No'}
          </Typography>
          <Typography>
            <b>Date Created:</b> {data?.date}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}