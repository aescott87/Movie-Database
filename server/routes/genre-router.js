const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//GET all genres from the DB
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM genres';
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing SELECT genres query', error);
        res.sendStatus(500);
    });
});

module.exports = router;