import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Browse({ data }) {
  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' component='h1' align='center'>
        Ant Data
      </Typography>

      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component='img'
                  height='200'
                  image={`/static/images/${item.image}`}
                  alt={item.species}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {item.species} ({item.caste})
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Manage (restricted)</Button>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}