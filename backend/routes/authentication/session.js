const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.get('/', async (req, res) => {
  if (!req.cookies?.['antlab-session'])
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });

  const foundCookie = await cookies.findOne({
    cookie: req.cookies['antlab-session']
  }).populate('user').exec();

  if (!foundCookie)
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });

  return res.json({
    status: 'ok',
    message: 'Validated',
    username: foundCookie.user.username
  });
});

module.exports = router;