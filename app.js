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
            's.aircraft_id', 
            'a.aircraft_name', 
            's.base_id',
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
            's.aircraft_id', 
            'a.aircraft_name', 
            's.base_id', 
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
  let isTailNumberValid = false;
  let isAircraftIdInt = false
  let isBaseIdInt = false
  let isFlyableBoolean = false;
  let isDiscriptionString = false;
  let isPriorityInt = false;

  //TODO tailNumber validation
  if (typeof status.aircraft_id === typeof 0) {
    isAircraftIdInt = true;
  } else {
    res.status(400).send({
      message: `Your aircraft_id datatype is invalid. Please use a number.`,
      status: status
    })
  }
  if (typeof status.base_id === typeof 0) {
    isBaseIdInt = true
  } else {
    res.status(400).send({
      message: `Your base_id datatype is invalid. Please use a number.`,
      status: status
    })
  }
  if (typeof status.status_is_flyable === typeof true) {
    isFlyableBoolean = true;
  } else {
    res.status(400).send({
      message: `Your status_is_flyable datatype is invalid. Please a boolean.`,
      status: status
    })
  }
  if (typeof status.status_description === typeof 'string') {
    isDiscriptionString = true;
  } else {
    res.status(400).send({
      message: `Your status_description datatype is invalid. Please use a string.`,
      status: status
    })
  }
  if (typeof status.status_priority === typeof 0) {
    isPriorityInt = true;
  } else {
    res.status(400).send({
      message: `Your status_priority datatype is invalid. Please use a number.`,
      status: status
    })
  }
  if (isAircraftIdInt === true && isBaseIdInt === true && isFlyableBoolean === true && isDiscriptionString === true && isPriorityInt === true) {
      knex.insert({
        "status_tail_number": status.status_tail_number, // verify it is a string, length of 8, and no characters only numbers, while maintaining leading zeros.
        "aircraft_id":        status.aircraft_id, // verify it is a number
        "base_id":            status.base_id, // verify it is a number
        "status_is_flyable":  status.status_is_flyable, // verify it is a boolean
        "status_description": status.status_description, // verify it is a string 
        "status_priority":    status.status_priority // verify it is a number
      })
      .into('status')
      .then(data => res.status(201).json(data))
      .catch(data => res.status(400).send({
        message: `Status with tail number of ${status.status_tail_number} already exists`,
        status: status
      }))
  }

});

// PATCH /status/:status_id

app.patch('/status/:status_id', function(req, res) {
  let status = req.body;
  let isTailNumberValid = false; // TODO
  let isAircraftIdInt = false
  let isBaseIdInt = false
  let isFlyableBoolean = false;
  let isDiscriptionString = false;
  let isPriorityInt = false;

  // isTailNumberVaild TO DO
  if (typeof status.aircraft_id === typeof 0) {
    isAircraftIdInt = true;
  } else {
    res.status(400).send({
      message: `Your aircraft_id datatype is invalid. Please use a number.`,
      status: status
    })
  }
  if (typeof status.base_id === typeof 0) {
    isBaseIdInt = true
  } else {
    res.status(400).send({
      message: `Your base_id datatype is invalid. Please use a number.`,
      status: status
    })
  }
  if (typeof status.status_is_flyable === typeof true) {
    isFlyableBoolean = true;
  } else {
    res.status(400).send({
      message: `Your status_is_flyable datatype is invalid. Please a boolean.`,
      status: status
    })
  }
  if (typeof status.status_description === typeof 'string') {
    isDiscriptionString = true;
  } else {
    res.status(400).send({
      message: `Your status_description datatype is invalid. Please use a string.`,
      status: status
    })
  }
  if (typeof status.status_priority === typeof 0) {
    isPriorityInt = true;
  } else {
    res.status(400).send({
      message: `Your status_priority datatype is invalid. Please use a number.`,
      status: status
    })
  }
  if (isAircraftIdInt === true && isBaseIdInt === true && isFlyableBoolean === true && isDiscriptionString === true && isPriorityInt === true) {
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
          return res.status(200).send({
            message: `Status ${req.params.status_id} has been updated`,
            status: status
          })
      }
    })
   .catch(err =>
      res.status(400).json({
      message:
              'Invalid ID supplied'
      })
    );
  }
});


// DELETE /status/:status_id

app.delete('/status/:status_id', (req, res) => {
    let deletedRow = {};
    function setDeletedRow (input) {
      deletedRow = input[0]
    }

    
    knex('status')
    .where('status_id', req.params.status_id)
    .then((data) => {
      if (data.length === 0){
        return res.status(404).json({
          message:
          'Status ID not found'
      })
      } else {
          setDeletedRow(data)
          knex('status')
          .where('status_id', req.params.status_id)
          .del()
          .then((data) => {
            return res.status(200).send({
              message: `Status ${req.params.status_id} has been deleted`,
              status: deletedRow
            })
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