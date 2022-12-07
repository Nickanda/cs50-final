const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
  // delete the cookie from the database
  try {
    await cookies.deleteOne({
      cookie: req.cookies['antlab-session']
    });

    // remove their cookie by overwriting the cookie to expire immediately (for some reason res.clearCookie was not working)
    res.cookie('antlab-session', '', { expires: Date.now(), maxAge: 0, overwrite: true });

    // redirect them back to the main page
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