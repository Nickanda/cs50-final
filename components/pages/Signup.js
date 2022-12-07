import * as React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import RemovableAlert from '../items/Alert';

export default function Signup() {
  const [values, setValues] = React.useState({
    showPassword: false,
    openAlert: false,
    signupError: null,
    confirmationError: false
  });

  const [credentials, setCredentials] = React.useState({
    username: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleClickShowPassword = () => {
    setValues({
      showPassword: !values.showPassword,
    });
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  const handleUsernameChange = (e) => {
    setCredentials({
      ...credentials,
      username: e.target.value
    });
  }

  const handlePasswordChange = (e) => {
    setCredentials({
      ...credentials,
      password: e.target.value
    });
  }

  const handlePasswordConfirmationChange = (e) => {
    setCredentials({
      ...credentials,
      passwordConfirmation: e.target.value
    });
  }

  const handleAlertRemoval = () => {
    setValues({
      ...values,
      openAlert: false,
      signupError: null
    });
  }

  const handlePasswordConfirmation = (e) => {
    handlePasswordConfirmationChange(e);

    const password = credentials.password;
    const passwordConfirmation = e.target.value;

    if (password !== passwordConfirmation) {
      values.confirmationError = true;
    } else {
      values.confirmationError = false;
    }
  }

  const signUp = (e) => {
    e.preventDefault();
    
    const username = credentials.username;
    const password = credentials.password;
    const passwordConfirmation = credentials.passwordConfirmation;

    if (password !== passwordConfirmation) {
      return;
    }

    fetch('http://127.0.0.1:3001/api/authentication/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        window.location.href = '/';
      } else {
        setValues({
          ...values,
          openAlert: true,
          signupError: data.message
        });
      }
    });
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' align='center'>
        Sign Up
      </Typography>

      <br />

      <RemovableAlert text={values.signupError} open={values.openAlert} onClick={handleAlertRemoval} />

      <FormGroup>
        <FormControl>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input 
          id='username' 
          margin='normal' 
          type='text' 
          onChange={handleUsernameChange} 
          />
        </FormControl>

        <br />

        <FormControl>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <Input
            id='password'
            aria-describedby='password-helper-text'
            margin='normal'
            type={values.showPassword ? 'text' : 'password'}
            onChange={handlePasswordChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            } 
            />
          <FormHelperText id='password-helper-text'>We&apos;ll never share your password.</FormHelperText>
        </FormControl>

        <br />

        <FormControl>
          <InputLabel htmlFor='password-confirmation'>Confirm Password</InputLabel>
          <Input
            id='password-confirmation'
            aria-describedby='password-confirmation-helper-text'
            margin='normal'
            type={values.showPassword ? 'text' : 'password'}
            onChange={handlePasswordConfirmation}
            error={values.confirmationError}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  edge='end'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            } 
            />
          <FormHelperText id='password-confirmation-helper-text' error={values.confirmationError}>{values.confirmationError ? 'Passwords don\'t match.' : 'Type in your password again.'}</FormHelperText>
        </FormControl>

        <br />
        <br />

        <Button type='submit' variant='contained' onClick={signUp}>Sign up</Button>

        <br />

        <Typography>Have an account? <Link href='/login'>Log in.</Link> </Typography>
      </FormGroup>
    </Container>

  );
}

