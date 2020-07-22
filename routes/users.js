const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
  connection.query('SELECT * from users', (err, results) => {
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
  connection.query('SELECT * from users WHERE id = ?', id, (err, results) => {
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


router.get('/admin/:id', (req, res) => {
  const { id } = req.params
  connection.query('SELECT admin from users WHERE id = ?', id, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Internal server error' })
      );
    }
    if (results.length === 0) {
      return (
        res.status(404).json({ message: 'User ID not found' })
      );
    }
    res.json(results[0])
  });
});

router.post('/', (req, res) => {

  const formData = req.body;

  if (formData.ordinal_number == null || formData.email == null || formData.password == null) {
    return (
      res.status(400).json({ message: "Necessary fields are empty" })
    );
  }

  connection.query('SELECT * from users WHERE email = ?', formData.email, (errAll, resultsAll) => {

    if (errAll) {
      return (
        res.status(500)
      )
    }

    if (resultsAll.length === 0) {
      bcrypt.hash(formData.password, 10, function (err, hash) {
        formData.password = hash;
        if (res) {
          connection.query('INSERT INTO users SET ?', formData, (errInsert, results) => {
            if (errInsert) {
              return (
                res.status(500).json({ ...formData })
              );
            }
            delete formData.password
            return res.status(201).json({ ...formData, id: results.insertId });
          });
        } else {
          res.status(500).json({ message: "pass no hash" });
        }
      })
    } else {
      return res.status(400).json({ message: "user already exist" })
    }
  })
})



router.put('/:id', (req, res) => {

  const idDVM = req.params.id;
  const formData = req.body;

  connection.query('UPDATE users SET ? WHERE id = ?', [formData, idDVM], (err, results) => {
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

  connection.query('DELETE FROM users WHERE id = ?', [idDVM], err => {
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
