const express = require('express')
const router = express.Router();


const performances = require('./performances');


router.use('/performances', performances)



module.exports = router;
