const express = require('express');

const router = express.Router();

router.use('/account/data', require('./account/data'));
router.use('/account/delete', require('./account/delete'));
router.use('/account/reset-password', require('./account/reset-password'));

router.use('/ants/database', require('./ants/database'));

router.use('/authentication/login', require('./authentication/login'));
router.use('/authentication/logout', require('./authentication/logout'));
router.use('/authentication/signup', require('./authentication/signup'));
router.use('/authentication/session', require('./authentication/session'));

module.exports = router;