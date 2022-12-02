import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../../components/Layout';

export default function Account() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/account" />
    </React.Fragment>
  );
}