const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//GET all movies from the DB
router.get('/', (req, res) => {
    const queryText = 'SELECT * FROM movies';
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing SELECT movies query', error);
        res.sendStatus(500);
    });
});

//Update movie with an id
router.put('/:id', (req, res) => {
    res.sendStatus(200);
});

module.exports = router;