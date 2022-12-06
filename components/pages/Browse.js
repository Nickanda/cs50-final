import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import AntInfoDialog from '../items/AntInfoDialog';

export default function Browse({ data, user }) {
  const [values, setValues] = React.useState({
    openLearnMore: null,
  });

  const handleLearnMore = (item) => {
    setValues({
      ...values,
      openLearnMore: item
    });
  }

  const handleInfoClose = () => {
    setValues({
      ...values,
      openLearnMore: null
    });
  }

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' component='h1' align='center'>
        Ant Data
      </Typography>

      <Typography variant='body1' component='p' align='center'>
        Welcome to all of the data that have been uploaded to our website so far!
      </Typography>

      <br />

      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {data.map((item) => (
            <Grid item key={item._id} xs={12} sm={6} md={4}>
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
                  {item.owner.includes(user._id)
                    ? <Button size='small' component={Link} href="/settings/dashboard">Manage</Button>
                    : null}
                  <Button size='small' onClick={() => handleLearnMore(item._id)}>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <AntInfoDialog
        data={data.find(d => d._id == values.openLearnMore)}
        open={values.openLearnMore !== null}
        onClose={handleInfoClose}
      />
    </Container>
  );
}