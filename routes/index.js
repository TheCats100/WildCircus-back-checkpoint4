const express = require('express')
const router = express.Router();


const performances = require('./performances');
const artists = require('./artists');
const representations = require('./representations');
const users = require('./users');
const login = require('./auth');


router.use('/performances', performances)
router.use('/artists', artists)
router.use('/representations', representations)
router.use('/users', users)
router.use('/login', login);

module.exports = router;
