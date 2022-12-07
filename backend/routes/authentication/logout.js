const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
  console.log(req.cookies)
  await cookies.deleteOne({
    cookie: req.cookies['antlab-session']
  });

  res.cookie("antlab-session", '', { expires: Date.now(), maxAge: 0, overwrite: true });

  res.redirect(302, 'http://127.0.0.1:3000/');
});

module.exports = router;