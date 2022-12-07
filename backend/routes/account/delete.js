const express = require('express');

const router = express.Router();

const ants = require('../../../models/ants');
const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.delete('/', async (req, res) => {
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

    // locate all of their data and either delete them from the ant's owners or delete them permanently
    await ants.updateMany({
      owner: user._id
    }, {
      $pull: {
        owner: user._id
      }
    }).exec();

    await cookies.delete({
      user: user._id
    });

    await users.deleteOne({
      _id: user._id
    });

    // remove their cookie by overwriting the cookie to expire immediately (for some reason res.clearCookie was not working)
    res.cookie('antlab-session', '', { expires: Date.now(), maxAge: 0, overwrite: true });

    // redirect back to the main site
    res.redirect(302, 'http://127.0.0.1:3000/');
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;