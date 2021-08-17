const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);


app.get('/', function(req, res) {
  res.status(200).send("info at other endpoints.")
})

// GET /aircraft - lists all aircraft.

app.get('/aircraft', function(req, res) {
  knex
    .select('*')
    .from('aircraft')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// GET /base

app.get('/base', function(req, res) {
  knex
    .select('*')
    .from('base')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// GET /status

app.get('/status', function(req, res) {
  knex
    .select('*')
    .from('status')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// POST /status

// PATCH /status/:status_id

// DELETE /status/:status_id


module.exports = app;