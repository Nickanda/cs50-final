import * as React from 'react';
import useCookies from 'react-cookie/cjs/useCookies';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import AntInfoDialog from '../../items/AntInfoDialog';
import AntManageDialog from '../../items/AntManageDialog';

export default function Home({ data, user }) {
  const [values, setValues] = React.useState({
    openAlert: false,
    confirmationError: null,
    openUpload: false,
    openLearnMore: null,
    antData: null
  });

  const [upload, setUpload] = React.useState({
    species: '',
    caste: '',
    feignsDeath: '',
    image: '',
    HL: '',
    HH: '',
    EL: '',
    WL: '',
    MH: '',
    PL: '',
    PH: '',
    GL: '',
    TL: ''
  });

  const [cookie] = useCookies(['antlab-session']);

  const handleOpenUpload = (item) => {
    setValues({
      ...values,
      openUpload: !values.openUpload,
      antData: item
    });

    if (item) {
      const antData = data.find((ant) => ant._id === item);
      setUpload({
        species: antData.species,
        caste: antData.caste,
        feignsDeath: antData.feignsDeath,
        image: antData.image,
        HL: antData.lengths.HL,
        HH: antData.lengths.HH,
        EL: antData.lengths.EL,
        WL: antData.lengths.WL,
        MH: antData.lengths.MH,
        PL: antData.lengths.PL,
        PH: antData.lengths.PH,
        GL: antData.lengths.GL,
        TL: antData.lengths.TL
      });
    } else {
      setUpload({
        species: '',
        caste: '',
        feignsDeath: '',
        image: '',
        HL: '',
        HH: '',
        EL: '',
        WL: '',
        MH: '',
        PL: '',
        PH: '',
        GL: '',
        TL: ''
      })
    }
  };

  const handleUpdateValue = (e) => {
    console.log(e.target.name, e.target.value);
    setUpload({
      ...upload,
      [e.target.id]: e.target.value
    });
  }

  const handleSpecialUpload = (e) => {
    console.log(upload)
    setUpload({
      ...upload,
      [e.target.id]: isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value)
    });
  };

  const handleRadioUpload = (e) => {
    setUpload({
      ...upload,
      "feignsDeath": JSON.parse(e.target.value)
    });
  }

  const handleImageUpload = (e) => {
    setUpload({
      ...upload,
      image: e.target.files[0]
    });
  }

  const confirmUpload = (e) => {
    const formData = new FormData();

    for (const key in upload) {
      if (upload[key] === '') {
        setValues({
          ...values,
          openAlert: true,
          confirmationError: 'Please fill out all fields.'
        });
        return;
      }

      formData.append(key, upload[key]);
    }

    fetch("http://127.0.0.1:3001/api/ants/database", {
      method: "POST",
      credentials: 'include',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.status == 'ok') {
          location.reload();
        } else {
          setValues({
            ...values,
            openAlert: true,
            confirmationError: data.message
          });
        }
      });
  };

  const confirmSave = () => {
    const saveData = {}

    for (const key in upload) {
      if (upload[key] === '' && key !== "image") {
        setValues({
          ...values,
          openAlert: true,
          confirmationError: 'Please fill out all fields.'
        });
        return;
      }

      saveData[key] = upload[key];
    }

    saveData._id = values.antData;

    console.log(document.cookie)

    fetch("http://127.0.0.1:3001/api/ants/database", {
      method: "PUT",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status == 'ok') {
          location.reload();
        } else {
          setValues({
            ...values,
            openAlert: true,
            confirmationError: data.message
          });
        }
      });
  };

  const handleAlertRemoval = () => {
    setValues({
      ...values,
      openAlert: false,
      loginError: null
    });
  }

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
        Dashboard
      </Typography>

      <Typography variant='body1' component='p' align='center'>
        This is the dashboard page.
      </Typography>

      <br />

      <Grid container spacing={{ md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {data.length > 0 ? data.filter(d => d.owner.includes(user._id)).map(item => (
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
                <Typography variant='caption' color='text.secondary'>
                  Created on: {item.date}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' onClick={() => handleOpenUpload(item._id)}>Manage</Button>
                <Button size='small' onClick={() => handleLearnMore(item._id)}>Learn More</Button>
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
            onClick={() => handleOpenUpload(null)}
          >
            Upload Data
          </Button>
        </Container>
      </Grid>

      <AntInfoDialog data={data.find(d => d._id == values.openLearnMore)} open={values.openLearnMore !== null} onClose={handleInfoClose} />

      <AntManageDialog
        data={upload}
        values={values}
        functions={{
          handleOpenUpload: handleOpenUpload,
          handleAlertRemoval: handleAlertRemoval,
          handleUpdateValue: handleUpdateValue,
          handleRadioUpload: handleRadioUpload,
          handleSpecialUpload: handleSpecialUpload,
          handleImageUpload: handleImageUpload,
          confirmUpload: confirmUpload,
          confirmSave: confirmSave,
        }}
        save={values.antData !== null}
      />
    </Container>
  );
}