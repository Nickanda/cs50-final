const argon2 = require('argon2');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.options('/');
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
    }).collation({ locale: 'en', strength: 2 }).exec();

    if (!user)
      return res.status(400).json({
        status: 'error',
        message: 'Username does not exist',
      });

    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword)
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect password',
      });

    const cookie = uuidv4();

    await cookies.create({
      cookie: cookie,
      user: user._id
    });

    res.cookie('antlab-session', cookie, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      domain: '127.0.0.1',
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });

    return res.json({
      status: 'ok',
      message: 'Login successful',
      cookie: cookie
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;