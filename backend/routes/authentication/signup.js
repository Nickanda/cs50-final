const argon2 = require('argon2');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

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
    let user = await users.findOne({
      username: username
    }).collation({ locale: 'en', strength: 2 }).exec();

    if (user)
      return res.status(400).json({
        status: 'error',
        message: 'Username already exists',
      });

    const hashedPassword = await argon2.hash(password);

    await users.create({
      username: username,
      password: hashedPassword
    });

    const cookie = uuidv4();

    user = await users.findOne({
      username: username
    }).exec();

    await cookies.create({
      cookie: cookie,
      userId: user._id
    });

    return res.json({
      status: 'ok',
      message: 'Signup successful',
      cookie: cookie
    });
  } catch (err) {
    console.log(err)
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;