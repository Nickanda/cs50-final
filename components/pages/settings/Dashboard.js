import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

export default function Home({ data, user }) {
  const [file, setFile] = React.useState(null);

  const handleUpload = (e) => {
    console.log(e.target.value)
    setFile(e.target.value);
  };

  return (
    <Container maxWidth='xl'>
      <Typography variant='h4' component='h1' align='center'>
        Dashboard
      </Typography>

      <Typography variant='body1' component='p' align='center'>
        This is the dashboard page.
      </Typography>

      <br />

      <Grid container spacing={{ md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.length > 0 ? data.filter(data.owner.includes(user._id)).map(item => (
          <Grid item key={index} xs={12} sm={6} md={4}>
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
                <Button size='small'>Manage</Button>
                <Button size='small'>Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        )) : null}

        <Container justify="center" align='center' sx={{
          ml: 0,
          mt: 3
        }}>
        <Button
          variant="contained"
          component="label"
        >
          Upload Data (CSV)
          <Input
            type="file"
            sx={{
              display: 'none'
            }}
            onChange={handleUpload}
          />
        </Button>
        </Container>
      </Grid>
    </Container>
  );
}