import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Copyright from './Copyright';
import Navbar from './Navbar';

import About from './pages/About';
import Browse from './pages/Browse';
import Contact from './pages/Contact';
import Dashboard from './pages/settings/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/settings/Settings';
import Signup from './pages/Signup';

const pages = {
  '/about': About,
  '/browse': Browse,
  '/contact': Contact,
  '/dashboard': Dashboard,
  '/home': Home,
  '/login': Login,
  '/settings': Settings,
  '/signup': Signup
}

export default function Layout({ page, user, data }) {
  return (
    <Container sx={{
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 'auto'
    }}>
      <Navbar username={user ? user.username : null} sx={{ flexShrink: 0 }} />
      <Box sx={{
        my: 4,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '78vh'
      }}>
        {React.createElement(pages[page], { data: data, user: user })}
      </Box>
      <Copyright sx={{ my: 4, flexShrink: 0 }} />
    </Container>
  );
}
