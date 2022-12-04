import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../../components/Layout';

export default function Account({ username }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/account" username={username} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3001/api/authentication/session', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Access-Control-Allow-Credentials': true,
      'Cookie': context.req.headers.cookie
    }
  });
  const data = await res.json();
    
  return {
      props: {
        username: data.username || null
      }
    }
}