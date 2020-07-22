const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
    connection.query('SELECT * from performances', (err, results) => {
      if (err) {
        return (
          res.status(500).json({ message: 'No body was here..' })
        )
      }
      res.json(results);
    });
  });
  

module.exports = router;