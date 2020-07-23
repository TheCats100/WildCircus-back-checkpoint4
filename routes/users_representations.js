const express = require('express');
const connection = require('../conf');
const router = express.Router({ mergeParams: true });

router.get('/:userId/representations', (req, res) => {
  const userId = req.params.userId;
  connection.query('SELECT * FROM representations a JOIN users_representations da ON a.id=da.representations_id WHERE users_id = ?', userId, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});

router.post('/:userId/representations', (req, res) => {
  formData = req.body;
  connection.query('INSERT INTO users_representations SET ?', formData, (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});

router.delete('/:userId/representations/:representationId', (req, res) => {
  const { userId, representationsId } = req.params;
  connection.query('DELETE FROM users_representations WHERE users_id = ? AND representations_id = ?', [userId, representationsId], (err, results) => {
    if (err) {
      return (
        res.status(500).json({ message: 'Error server' })
      )
    }
    res.json(results);
  });
});




module.exports = router;