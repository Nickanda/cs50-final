import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Copyright from './Copyright';
import Navbar from './Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Settings from './pages/settings/Settings';

const pages = {
  '/home': Home,
  '/about': About,
  '/contact': Contact,
  '/settings': Settings,
}

export default function Layout({ page }) {
  return (
    <Container disableGutters>
      <Navbar />
      <Box sx={{ my: 4 }}>
        {React.createElement(pages[page])}
      </Box>
      <Copyright />
    </Container>
  );
}
