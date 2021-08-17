const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);


// GET /aircraft - lists all aircraft.

app.get('/aircraft', function(req, res) {
  knex
    .select('*')
    .from('aircraft')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again';
      })
    );
});

// GET /bases

// GET /status

// POST /status

// PATCH /status/:status_id

// DELETE /status/:status_id


