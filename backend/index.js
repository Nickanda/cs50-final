require('dotenv').config()

const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(compression());

// use express routers to modularize the code
app.use('/api', require('./routes'));

// app.get('/*', (req, res) => {
//   res.redirect(301, 'http://localhost:3000/'); 
// })

app.listen(3001, () => {
  console.log('Listening on port 3001');
});