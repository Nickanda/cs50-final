import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';

export default function About() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/about" />
    </React.Fragment>
  );
}