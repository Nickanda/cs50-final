const argon2 = require('argon2');
const express = require('express');
const uid = require('uid');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password || username == "" || password == "") {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid username or password',
    });
  }

  try {
    const user = await users.findOne({
      username: username
    }).exec();

    if (!user)
      return res.status(400).json({
        status: 'error',
        message: 'Username does not exist',
      });

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword)
      return res.status(400).json({
        status: 'error',
        message: 'Invalid password',
      });

    const cookie = uid(32);

    res.cookie('antlab-session', cookie, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });

    await cookies.create({
      cookie: cookie,
      userId: user._id
    });

    return res.json({
      status: 'ok',
      message: 'Login successful',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;