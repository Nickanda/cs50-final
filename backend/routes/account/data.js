const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const router = express.Router();

const ants = require('../../../models/ants');
const cookies = require('../../../models/cookies');

router.get('/', async (req, res) => {
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

    // locate all of their data between cookies ant ants
    const cookiesFound = await cookies.find({
      user: user._id
    }).exec();

    const antsFound = await ants.find({
      owner: user._id
    }).exec();

    // write a temporary json file that will be later sent to the user as a downloaded file
    await fs.writeFile(path.join(__dirname, '../../../tmp/data.json'), JSON.stringify({
      data: {
        ants: antsFound,
        user: user,
        cookies: cookiesFound
      }
    }));

    res.download('./tmp/data.json');
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

module.exports = router;