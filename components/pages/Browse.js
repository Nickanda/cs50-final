import * as React from 'react';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import FilterListIcon from '@mui/icons-material/FilterList';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import AntInfoDialog from '../items/AntInfoDialog';

export default function Browse({ data, user }) {
  const [values, setValues] = React.useState({
    openLearnMore: null,
    showFilter: false
  });

  const [filters, setFilters] = React.useState({
    search: '',
    species: '',
    caste: '',
    feignsDeath: false,
    order: '',
  });

  const [changedData, setChangedData] = React.useState(data);

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
  };

  const handleSearchChange = (e) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    for (const key in filters) {
      if (filters[key] && filters[key] !== '') {
        params.append(key, filters[key]);
      }
    }

    fetch('http://127.0.0.1:3001/api/ants/database?' + params, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(newData => {
        console.log(newData)
        setChangedData(newData.data);
      });
  };

  const handleFilter = () => {
    if (values.showFilter) {
      setFilters({
        search: '',
        species: '',
        caste: '',
        feignsDeath: false,
        order: ''
      });
    }

    setValues({
      ...values,
      showFilter: !values.showFilter
    });
  };

  const handleSpeciesChange = (e) => {
    setFilters({
      ...filters,
      'species': e.target.value
    });
  }

  const handleCasteChange = (e) => {
    setFilters({
      ...filters,
      'caste': e.target.value
    });
  }

  const handleFeignChange = (e) => {
    setFilters({
      ...filters,
      'feignsDeath': JSON.parse(e.target.value)
    });
  }

  const handleOrderChange = (e) => {
    setFilters({
      ...filters,
      'order': e.target.value
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

      <Paper square elevation={3}>
        <Grid container sx={{ py: 1 }} spacing={1}>
          <Grid item sm={0.5} />
          <Grid item xs={8} sm={10} align='center'>
            <Input placeholder='Search Species' fullWidth onChange={handleSearchChange} />
          </Grid>
          <Grid item xs={1.5} sm={0.5}>
            <IconButton aria-label='search' onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid item xs={1.5} sm={0.5}>
            <IconButton aria-label='filter' onClick={handleFilter}>
              <FilterListIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      <Paper square sx={{ display: values.showFilter ? '' : 'none' }}>
        <Grid container sx={{ py: 1, mt: 0.5 }} spacing={1}>
          <Grid item xs={0.5} />
          <Grid item>
            <Typography variant='h6' sx={{ color: 'gray' }} ml={{ xs: 1 }}>
              Filter Options
            </Typography>

            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 2, sm: 0, md: 3 }}
              justifyContent='space-between'
              direction='row'
              alignItems='center'
              ml={{ xs: 1 }}
            >
              <Grid item>
                <FormLabel id='species-group-label'>Species</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='species-group-label'
                  name='species-group'
                  onChange={handleSpeciesChange}
                >
                  <FormControlLabel value='asc' control={<Radio />} label='A -> Z' />
                  <FormControlLabel value='desc' control={<Radio />} label='Z -> A' />
                </RadioGroup>
              </Grid>

              <Grid item>
                <FormLabel id='caste-group-label'>Caste</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='caste-group-label'
                  name='caste-group'
                  onChange={handleCasteChange}
                >
                  <FormControlLabel value='asc' control={<Radio />} label='A -> Z' />
                  <FormControlLabel value='desc' control={<Radio />} label='Z -> A' />
                </RadioGroup>
              </Grid>
              <Grid item>
                <FormLabel id='feign-death-group-label'>Feigns Death?</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='feign-death-group-label'
                  name='feign-death-group'
                  onChange={handleFeignChange}
                >
                  <FormControlLabel value='true' control={<Radio />} label='Yes' />
                  <FormControlLabel value='false' control={<Radio />} label='No' />
                </RadioGroup>
              </Grid>

              <Grid item>
                <FormLabel id='order-group-label'>Order</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='order-group-label'
                  name='order-group'
                  onChange={handleOrderChange}
                >
                  <FormControlLabel value='desc' control={<Radio />} label='Latest' />
                  <FormControlLabel value='asc' control={<Radio />} label='Oldest' />
                </RadioGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      <br />

      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          {changedData.map((item) => (
            <Grid
              item
              key={item._id}
              xs={12}
              sm={6}
              md={4}
            >
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
                    ? <Button size='small' component={Link} href='/settings/dashboard'>Manage</Button>
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