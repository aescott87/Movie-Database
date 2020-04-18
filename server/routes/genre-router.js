const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

//GET genres for each movie from the DB
router.get('/:id', (req, res) => { 
    const queryText = 'SELECT name FROM movies JOIN movies_genres ON movies.id = movies_genres.movie_id JOIN genres ON movies_genres.genre_id = genres.id WHERE "movies"."id" = $1';
    pool.query(queryText, [req.params.id])
      .then((result) => { res.send(result.rows); })
      .catch((error) => {
        console.log('Error completing SELECT genres query', error);
        res.sendStatus(500);
    });
});

module.exports = router;