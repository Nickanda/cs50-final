const express = require('express');

const router = express.Router();

const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
  res.clearCookie('antlab-session');
  
  await cookies.deleteOne({
    cookie: req.cookies['antlab-session']
  });

  res.redirect(301, '/');
});

module.exports = router;