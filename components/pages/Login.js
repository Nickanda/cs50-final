import * as React from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import RemovableAlert from '../items/Alert';

export default function Login() {
  const [values, setValues] = React.useState({
    showPassword: false,
    openAlert: false,
    loginError: null
  });

  const [credentials, setCredentials] = React.useState({
    username: '',
    password: ''
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

  const handleAlertRemoval = () => {
    setValues({
      ...values,
      openAlert: false,
      loginError: null
    });
  }

  const logIn = (e) => {
    e.preventDefault();

    const username = credentials.username;
    const password = credentials.password;

    if (!username || !password) {
      setValues({
        ...values,
        openAlert: true,
        loginError: 'Please fill out all fields'
      })
      return;
    }

    fetch('http://127.0.0.1:3001/api/authentication/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(res => res.json())
      .then(data => {
        if (data.status == 'ok') {
          window.location.href = '/';
        } else {
          setValues({
            ...values,
            openAlert: true,
            loginError: data.message
          });
        }
      });
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' align='center'>
        Log In
      </Typography>

      <br />

      <RemovableAlert text={values.loginError} open={values.openAlert} onClick={handleAlertRemoval} />

      <FormGroup id='login-group'>
        <FormControl>
          <InputLabel htmlFor='username'>Username</InputLabel>
          <Input
            id='username'
            aria-describedby='username-helper-text'
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
        </FormControl>

        <br />
        <br />

        <Button type='submit' variant='contained' onClick={logIn}>Log In</Button>

        <br />

        <Typography>Don&apos;t have an account? <Link href='/signup'>Create an account here.</Link> </Typography>
      </FormGroup>
    </Container>
  );
}

