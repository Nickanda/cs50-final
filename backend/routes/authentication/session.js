const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.get('/', async (req, res) => {
  console.log(req.cookies)
  if (!req.cookies?.['antlab-session'])
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });

  const foundCookie = await cookies.findOne({
    cookie: req.cookies['antlab-session']
  }).exec();

  if (!foundCookie)
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized',
    });

  const foundUser = await users.findOne({
    _id: foundCookie.userId
  }).exec();

  return res.json({
    status: 'ok',
    message: 'Validated',
    user: foundUser.username
  });
});

module.exports = router;