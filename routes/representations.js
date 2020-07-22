const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  connection.query('SELECT * from representations', (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'No body was here..' })
      )
    }
    res.json(results);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT * from representations WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Internal server error' })
      )
    }
    if (results.length === 0) {
      return (
        res.status(404).json({ message: 'User ID not found' })
      )
    }
    delete results[0].password
    res.json(results[0])
  });
});




router.put('/:id', (req, res) => {

  const idDVM = req.params.id;
  const formData = req.body;

  connection.query('UPDATE representations SET ? WHERE id = ?', [formData, idDVM], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: "Error server" })
      )
    }
    if (results.changedRows === 0) {
      return (
        res.status(404).json({ message: 'User ID not found' })
      )
    }
    res.status(200).json({ message: `Changed row ${results.changedRows}` });
  });
});

router.delete('/:id', (req, res) => {
  const idDVM = req.params.id;

  connection.query('DELETE FROM representations WHERE id = ?', [idDVM], err => {
    if (err) {
      return (
        res.status(500).json({ message: "Internal server error" })
      )
    } else {
      res.sendStatus(200);
    }
  });
});



module.exports = router;