const argon2 = require('argon2');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.options('/');
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
    // find the user in the database, if it doesn't exist, return 400
    const user = await users.findOne({
      username: username
    }).collation({ locale: 'en', strength: 2 }).exec();

    if (!user)
      return res.status(400).json({
        status: 'error',
        message: 'Username does not exist',
      });

    // if the password is incorrect, return 400
    const validPassword = await argon2.verify(user.password, password);

    if (!validPassword)
      return res.status(400).json({
        status: 'error',
        message: 'Incorrect password',
      });

    // create a new cookie for the user and send that cookie back to the client
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
      message: 'Login successful'
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