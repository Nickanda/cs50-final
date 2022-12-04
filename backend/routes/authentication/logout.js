const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
  await cookies.deleteOne({
    cookie: req.cookies['antlab-session']
  });

  res.clearCookie('antlab-session');

  // res.json({
  //   status: 'ok'
  // });

  res.redirect(302, 'http://localhost:3000/');
});

module.exports = router;