const router = require('express').Router();
const users = require('./api/users');

router.use('/api/users', users);

module.exports = router;