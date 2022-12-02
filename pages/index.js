import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/home" />
    </React.Fragment>
  );
}