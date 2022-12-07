import * as React from 'react';

import Container from '@mui/material/Container';
import Image from 'next/image';
import Typography from '@mui/material/Typography';

export default function Home() {
  return (
    <Container maxWidth='md'>
      <Typography variant='h4' component='h1' align='center'>
        About Us
      </Typography>

      <br />

      <Typography variant='body1' component='p' align='center'>
        We are a group fo students taking LS50 (Life Sciences 50) who are under the direction of Buck Trible, a myrmecologist at Harvard University who studies everything ants! We are currently working on a project where we analyze different ant species and various aspects of their behavior. We are also working on a project where we analyze the behavior of ants in different environments.
      </Typography>

      <br />

      <Typography variant='body1' component='p' align='center'>
        Through the combined effort of the various members in the LS50 class, we have each studied a different phylogeny of ants and correlated different aspects of these ants together. Some of us are studying the behavioral correlation between ants and their environment, while others are studying the developmental correlation between ants. Some are studying specifically at either workers or queens, while others are studying the differences across workers and queens.
      </Typography>

      <br />

      <Typography variant='body1' component='p' align='center'>
        We would also like to thank Harvard University&apos;s Museum of Comparative Zoology for providing us with the resources to conduct our research. The MCZ currently hosts the largest collection of ants in the world, and we are very grateful for the opportunity to study these ants. Students in the LS50 class were able to utilize images taken of these ants along with data collected from an online source, AntWeb, to conduct our research. Through the collected data, we hope to host some of this data online for everyone to use, regardless of whether you are a student or not.
      </Typography>

      <br />

      <Container sx={{ position: 'relative', height: '67vh', width: '90vh' }}>
        <Image src='/static/images/ls50_class.jpg' alt='LS50 Class Picture' fill='contain' />
      </Container>
    </Container>
  );
}