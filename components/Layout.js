import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Copyright from './Copyright';
import Navbar from './Navbar';

import About from './pages/About';
import Account from './pages/settings/Account';
import Browse from './pages/Browse';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/settings/Settings';
import Signup from './pages/Signup';

const pages = {
  '/about': About,
  '/account': Account,
  '/browse': Browse,
  '/contact': Contact,
  '/home': Home,
  '/login': Login,
  '/settings': Settings,
  '/signup': Signup
}

export default function Layout({ page, username, data }) {
  return (
    <Container disableGutters>
      <Navbar username={username} />
      <Box sx={{ my: 4, }}>
        {React.createElement(pages[page], { data: page == '/browse' ? data : null })}
      </Box>
      <Copyright />
    </Container>
  );
}
