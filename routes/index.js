const express = require('express')
const router = express.Router();


const performances = require('./performances');
const artists = require('./artists');
const representations = require('./representations')


router.use('/performances', performances)
router.use('/artists', artists)
router.use('/representations', representations)


module.exports = router;
