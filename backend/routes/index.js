const express = require('express');

const router = express.Router();

router.use('/authentication/login', require('./authentication/login'));
router.use('/authentication/logout', require('./authentication/logout'));
router.use('/authentication/signup', require('./authentication/signup'));
router.use('/authentication/session', require('./authentication/session'));

module.exports = router;