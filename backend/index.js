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
db.on('connected', () => {
  console.log('MongoDB has been connected!')
});

const whitelist = ['http://127.0.0.1:3000'];
const corsOptions = {
  origin: function(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
}

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());

// Set options for CORS
app.use(function (req, res, next) {
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Cookie, Content-Type, Custom')

  // Pass to next layer of middleware
  next();
});

app.use(cors(corsOptions));

app.use('/api', require('./routes'));

app.listen(3001, () => {
  console.log('Listening on port 3001');
});