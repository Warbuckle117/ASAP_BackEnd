const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json()) // for parsing application/json


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
  knex('status as s')
    .innerJoin('aircraft as a', 's.aircraft_id', 'a.aircraft_id')
    .innerJoin('base as b', 's.base_id', 'b.base_id')
    .select('s.status_id', 
            's.status_tail_number', 
            'a.aircraft_name', 
            'b.base_name', 
            's.status_is_flyable', 
            's.status_description', 
            's.status_priority', 
            's.updated_at')
    .orderBy('s.status_id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again', err
      })
    );
});

// GET /status/:id

app.get('/status/:status_id', function(req, res){
    /* GET a status by id */
    knex('status as s')
    .innerJoin('aircraft as a', 's.aircraft_id', 'a.aircraft_id')
    .innerJoin('base as b', 's.base_id', 'b.base_id')
    .select('s.status_id', 
            's.status_tail_number', 
            'a.aircraft_name', 
            'b.base_name', 
            's.status_is_flyable', 
            's.status_description', 
            's.status_priority', 
            's.updated_at')
    .where('status_id', req.params.status_id)
    .then(data => {
            if (data.length === 0){
            return res.status(404).json({
                message:
                'Status ID not found'
            })
            } else {
            return res.status(200).json(data)
            }
    })
    .catch(err =>
        res.status(400).json({
        message:
                'Invalid ID supplied'
        })
    );
})

// POST /status

app.post('/status', function(req, res) {
  let status = req.body;
  knex.insert({
    "status_tail_number": status.status_tail_number,
    "aircraft_id":        status.aircraft_id,
    "base_id":            status.base_id,
    "status_is_flyable":  status.status_is_flyable,
    "status_description": status.status_description,
    "status_priority":    status.status_priority
  })
  .into('status')
  .then(data => res.status(201).json(data))
  .then(console.log("post request complete"))
  

});

// PATCH /status/:status_id

app.patch('/status/:status_id', function(req, res) {
  knex('status')
    .where('status_id', req.params.status_id)
    .update(req.body)
    .then((data) => {
    if (data.length === 0){
    return res.status(404).json({
        message:
        'Status ID not found'
      })
    }
    else if (typeof req.body.status_tail_number === typeof 0) {
      return res.status(406).json({
        message: "Please use data type of string for the tail number"
      })
    }
    else {
        return res.status(200).send(`Status ${req.params.status_id} has been updated`)
    }
  })
  .catch(err =>
      res.status(400).json({
      message:
              'Invalid ID supplied'
      })
  );
});


// DELETE /status/:status_id

app.delete('/status/:status_id', (req, res) => {
    knex('status')
    .where('status_id', req.params.status_id)
    .then((data) => {
      if (data.length === 0){
        return res.status(404).json({
          message:
          'Status ID not found'
      })
      } else {
          knex('status')
          .where('status_id', req.params.status_id)
          .del()
          .then((data) => {
            return res.status(200).send(`Status ${req.params.status_id} has been deleted`)
          })
      }
    })
    .catch(err =>
        res.status(400).json({
        message:
                'Invalid ID supplied'
        })
    );
});




module.exports = app;