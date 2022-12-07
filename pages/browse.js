import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Layout from '../components/Layout';

export default function Contact({ user, data }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Layout page='/browse' user={user} data={data} />
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

  let antRes;
  if (!data.user) {
    antRes = await fetch('http://127.0.0.1:3001/api/ants/database?user=' + data.user._id, {
      method: 'GET',
      headers: {
        'Cookie': context.req.headers.cookie
      }
    });
  } else {
    antRes = await fetch('http://127.0.0.1:3001/api/ants/database', {
      method: 'GET',
      headers: {
        'Cookie': context.req.headers.cookie
      }
    });
  }
  const antData = await antRes.json();

  return {
    props: {
      user: data.user || null,
      data: antData.data
    }
  }
}