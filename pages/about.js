import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';

export default function About({ user }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/about" user={user} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://127.0.0.1:3001/api/authentication/session', {
    method: 'GET',
    headers: {
      'Cookie': context.req.headers.cookie
    }
  });
  const data = await res.json();
    
  return {
      props: {
        user: data.user || null,
      }
    }
}