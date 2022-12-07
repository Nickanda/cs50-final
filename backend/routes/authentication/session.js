const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.get('/', async (req, res) => {
  // if the cookie does not exist in either the request or the database, return 401
  try {
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

    // return the user's data
    return res.json({
      status: 'ok',
      message: 'Validated',
      user: {
        _id: foundCookie.user._id,
        username: foundCookie.user.username
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;