const express = require('express');

const router = express.Router();

const ants = require('../../../models/ants');
const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.get('/', async (req, res) => {
  const cookie = await cookies.findOne({
    cookie: req.cookies['antlab-session']
  }).populate('user').exec();

  if (!cookie)
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    });

  const user = cookie.user;

  const cookies = await cookies.find({
    user: user._id
  }).exec();

  const ants = await ants.find({
    owner: user._id
  }).exec();

  res.json({
    status: 'ok',
    data: {
      ants: ants,
      user: user,
      cookies: cookies
    }
  });
});