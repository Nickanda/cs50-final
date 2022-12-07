const argon2 = require('argon2');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  // make sure all of the required fields are present
  if (!username || !password || username == '' || password == '') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid username or password',
    });
  }

  try {
    // if the user already exists, return 400
    let user = await users.findOne({
      username: username
    }).collation({ locale: 'en', strength: 2 }).exec();

    if (user)
      return res.status(400).json({
        status: 'error',
        message: 'Username already exists',
      });

    // hash the password and create the user
    const hashedPassword = await argon2.hash(password);

    await users.create({
      username: username,
      password: hashedPassword
    });

    // create a new cookie for the user and send that cookie back to the client
    const cookie = uuidv4();

    user = await users.findOne({
      username: username
    }).exec();

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
      message: 'Signup successful'
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