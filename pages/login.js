import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';

export default function Login({ user }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page='/login' user={user} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://127.0.0.1:3001/api/authentication/session');
  const data = await res.json()
    
  return {
      props: {
        user: data.user || null,
      }
    }
}