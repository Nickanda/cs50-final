const express = require('express');

const router = express.Router();

router.use('/ants/database', require('./ants/database'));
router.use('/ants/upload', require('./ants/upload'));

router.use('/authentication/login', require('./authentication/login'));
router.use('/authentication/logout', require('./authentication/logout'));
router.use('/authentication/signup', require('./authentication/signup'));
router.use('/authentication/session', require('./authentication/session'));

module.exports = router;