const express = require('express');

const router = express.Router();

const ants = require('../../../models/ants');

router.get('/', async (req, res) => {
  

  const ants = await ants.find({}).exec();
  
  res.json({
    status: 'ok',
    message: 'AntLab API',
  });
});

module.exports = router;