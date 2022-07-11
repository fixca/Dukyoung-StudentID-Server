const express = require('express');
const router = express.Router();

const logger = require('./Logger');

router.use('/logger', logger);

module.exports = router;