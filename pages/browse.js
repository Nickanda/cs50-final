import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';

export default function Contact({ username, data }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page="/browse" username={username} data={data} />
    </React.Fragment>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch('http://localhost:3001/api/authentication/session', {
    method: 'GET',
    headers: {
      'Cookie': context.req.headers.cookie
    }
  });
  const data = await res.json();

  const antRes = await fetch('/api/ants/database', {
    method: 'GET',
    headers: {
      'Cookie': context.req.headers.cookie
    }
  });
  const antData = await antRes.json();
    
  return {
      props: {
        username: data.username || null,
        data: antData.data
      }
    }
}