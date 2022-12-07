import * as React from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Container>
      <Typography variant='h4' component='h1' align='center'>
        Trible Lab
      </Typography>

      <Typography variant='body1' component='p' align='center'>
        Welcome to the Trible Lab website! Here you can find information about our research, as well as the data we have collected.
      </Typography>

      <br />

      <Typography variant='h5' component='h2' align='center'>
        Features:
      </Typography>

      <Grid container alignItems='center' justifyContent='center'>
        <List sx={{ listStyleType: 'disc' }}>
          <ListItem sx={{ display: 'list-item' }}>View all of the data we have collected so far</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Upload your own data to our database</ListItem>
          <ListItem sx={{ display: 'list-item' }}>View the data you have uploaded</ListItem>
        </List>
      </Grid>

      <br />

      <Typography variant='h5' component='h2' align='center'>
        Visit some parts of the website:
      </Typography>

      <Grid container alignItems='center' justifyContent='center'>
        <List sx={{ listStyleType: 'disc' }}>
          <ListItem sx={{ display: 'list-item' }}><Link href='/browse'>Browse all of the data we have collected so far</Link></ListItem>
          <ListItem sx={{ display: 'list-item' }}><Link href='/login'>Create and log into your own account</Link></ListItem>
          <ListItem sx={{ display: 'list-item' }}><Link href='/about'>Learn more about the lab</Link></ListItem>
          <ListItem sx={{ display: 'list-item' }}><Link href='/contact'>Contact the people behind this lab!</Link></ListItem>
        </List>
      </Grid>
    </Container>
  );
}