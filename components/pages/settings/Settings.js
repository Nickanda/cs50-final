import * as React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import RemovableAlert from '../../items/Alert';

export default function Home() {
  const [values, setValues] = React.useState({
    showResetPassword: false,
    showDeleteAccount: false,
    openAlert: false,
    resetError: null,
    confirmationError: false
  });

  const [passwords, setPasswords] = React.useState({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  });

  const handleResetPassword = () => {
    setValues({
      ...values,
      showResetPassword: !values.showResetPassword,
    });
  };

  const handleDeleteAccount = () => {
    setValues({
      ...values,
      showDeleteAccount: !values.showDeleteAccount,
    });
  };

  const changeOldPassword = (e) => {
    setPasswords({
      ...passwords,
      oldPassword: e.target.value
    });
  };

  const changeNewPassword = (e) => {
    setPasswords({
      ...passwords,
      newPassword: e.target.value
    });
  };

  const changeNewPasswordConfirmation = (e) => {
    setPasswords({
      ...passwords,
      newPasswordConfirmation: e.target.value
    });
  };

  const handlePasswordConfirmation = (e) => {
    changeNewPasswordConfirmation(e);

    const password = passwords.newPassword;
    const passwordConfirmation = e.target.value;

    if (password !== passwordConfirmation) {
      values.confirmationError = true;
    } else {
      values.confirmationError = false;
    }
  }

  const confirmResetPassword = (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.newPasswordConfirmation) {
      setValues({
        ...values,
        openAlert: true,
        resetError: 'Passwords do not match'
      });
      return;
    }

    fetch('http://127.0.0.1:3001/api/account/reset-password', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status == 'ok') {
        window.location.href = '/';
      } else {
        setValues({
          ...values,
          openAlert: true,
          resetError: data.message
        });
      }
    });
  };

  const confirmDeleteAccount = () => {
    fetch('http://127.0.0.1:3001/api/account/delete', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status == 'ok') {
        window.location.href = '/';
      } else {
        setValues({
          ...values,
          openAlert: true,
          resetError: data.message
        });
      }
    });
  }

  return (
    <Container maxWidth='lg'>
      <Typography variant='h4' component='h1' align='center'>
        Settings
      </Typography>

      <br />

      <Grid container spacing={2}>
        <Grid item xs={8} sm={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' component='h2'>
                Reset Password
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Forgot what your old password was? Click the button below to reset it!
              </Typography>
            </CardContent>
              <CardActions>
                <Button size='small' onClick={handleResetPassword}>Reset</Button>
              </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' component='h2'>
                Delete Account
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Click the button below to delete your account. This action cannot be undone.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' color='error' onClick={handleDeleteAccount}>Delete Account</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8} sm={4}>
          <Card>
            <CardContent>
              <Typography variant='h6' component='h2'>
                Request User Data
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Click the button below to request a copy of your user data.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size='small' component={Link} href='http://127.0.0.1:3001/api/account/data'>Request</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={values.showResetPassword} onClose={handleResetPassword}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to reset your password? This action cannot be undone.
          </DialogContentText>
          
          <RemovableAlert open={values.openAlert} message={values.resetError} severity='error' />

          <TextField
            autoFocus
            margin='dense'
            id='oldPassword'
            label='Old Password'
            type='password'
            fullWidth
            variant='standard'
            onChange={changeOldPassword}
          />
          <TextField
            margin='dense'
            id='newPassword'
            label='New Password'
            type='password'
            fullWidth
            variant='standard'
            onChange={changeNewPassword}
          />
          <TextField
            margin='dense'
            id='confirmNewPassword'
            label='Confirm New Password'
            type='password'
            fullWidth
            variant='standard'
            onChange={handlePasswordConfirmation}
            error={values.confirmationError}
            helperText={values.confirmationError ? 'Passwords don\'t match.' : ''}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetPassword}>Cancel</Button>
          <Button color='error' onClick={confirmResetPassword}>Reset</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={values.showDeleteAccount} onClose={handleDeleteAccount}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAccount}>Cancel</Button>
          <Button color='error' onClick={confirmDeleteAccount}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}