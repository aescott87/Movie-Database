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

//GET movie details based on movie ID
router.get('/:id', (req, res) => {
    const queryText = 'SELECT title, description FROM movies WHERE id = $1';
    pool.query(queryText, [req.params.id])
      .then((result) => { res.send(result.rows[0]); })
      .catch((error) => {
        console.log('Error completing SELECT details query', error);
        res.sendStatus(500);
    });
});

//Update movie with an id
router.put('/:id', (req, res) => {
    const movie = req.body
    const id = req.body.id
    let sqlText = `UPDATE movies SET title = $1, description = $2 WHERE "id" = $3;`;
  pool.query(sqlText, [movie.title, movie.description, id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error in update movie', error);
      res.sendStatus(500);
    })
});

module.exports = router;