import * as React from 'react';
import Image from 'next/image';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Container>
      <Typography variant='h4' component='h1' align='center'>
        Contact Us
      </Typography>

      <Typography variant='body1' align='center'>
        If you have any questions, comments, or concerns, please feel free to contact any of the following people!
      </Typography>

      <br />

      <Typography variant='h5' component='h2' align='center'>
        Lab Instructors
      </Typography>

      <br />

      <Grid container spacing={2}>
        <Grid item xs={5} align="right">
          <Image src='/static/images/buck_trible.jpeg' alt='Buck Trible' width='220' height='220' />
        </Grid>
        <Grid item xs={7}>
          <Typography variant='h6' component='h3'>
            Buck Trible 
          </Typography>
          <Typography variant='body1'>
            <b>Email:</b> <Link href='mailto:bucktrible@g.harvard.edu'>bucktrible@g.harvard.edu</Link>
          </Typography>
        </Grid>
        <Grid item xs={5} align="right">
          <Image src='/static/images/gautum_reddy.jpeg' alt='Gautum Reddy' width='220' height='257' />
        </Grid>
        <Grid item xs={7}>
          <Typography variant='h6' component='h3'>
            Gautum Reddy
          </Typography>
          <Typography variant='body1'>
            <b>Email:</b> <Link href='mailto:gautam_nallamala@fas.harvard.edu'>gautam_nallamala@fas.harvard.edu</Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}