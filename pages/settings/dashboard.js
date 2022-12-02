import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../../components/Layout';

export default function Dashboard() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/dashboard" />
    </React.Fragment>
  );
}