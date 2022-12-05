const express = require('express');

const router = express.Router();

const ants = require('../../../models/ants');
const cookies = require('../../../models/cookies');
const users = require('../../../models/users');

router.get('/', async (req, res) => {
  const cookie = await cookies.findOne({
    cookie: req.cookies['antlab-session']
  }).populate('user').exec();

  if (!cookie)
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    });

  const user = cookie.user;

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

  res.clearCookie('antlab-session');

  res.redirect(302, 'http://localhost:3000/');
});

module.exports = router;