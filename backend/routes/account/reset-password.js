const argon2 = require('argon2');
const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.post('/', async (req, res) => {
  // if the cookie does not exist in either the request or the database, return 401
  try {
    if (!req.cookies?.['antlab-session'])
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized',
      });

    const cookie = await cookies.findOne({
      cookie: req.cookies['antlab-session']
    }).populate('user').exec();

    if (!cookie)
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      });

    const user = cookie.user;

    // if the old password is correct, change the password to the new password
    if (await argon2.verify(user.password, req.body.oldPassword)) {
      await users.updateOne({
        _id: user._id
      }, {
        $set: {
          password: await argon2.hash(req.body.newPassword)
        }
      });

      return res.json({
        status: 'ok',
        message: 'Password changed'
      });
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'Unauthorized'
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;