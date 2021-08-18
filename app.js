const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');

app.use(express.json()) // for parsing application/json

app.use(cors({
  origin: '*'
}));

app.get('/', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.status(200).send("info at other endpoints.")
})

// GET /aircraft - lists all aircraft.

app.get('/aircraft', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
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
  res.setHeader("Access-Control-Allow-Origin", "*");
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
  res.setHeader("Access-Control-Allow-Origin", "*");
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
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// GET /status/:id

app.get('/status/:status_id', function(req, res){
  res.setHeader("Access-Control-Allow-Origin", "*");
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
  res.setHeader("Access-Control-Allow-Origin", "*");
  const status = req.body;
  let isInputValidObject = inputValidation(status);

  if (isInputValidObject.success === true) {
      knex.insert({
        "status_tail_number": status.status_tail_number, // verify it is a string, length of 8, and no characters only numbers, while maintaining leading zeros.
        "aircraft_id":        status.aircraft_id, // verify it is a number
        "base_id":            status.base_id, // verify it is a number
        "status_is_flyable":  status.status_is_flyable, // verify it is a boolean
        "status_description": status.status_description, // verify it is a string 
        "status_priority":    status.status_priority // verify it is a number
      })
      .into('status')
      .then((data) => {
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
            .where('s.status_tail_number', status.status_tail_number)
            .then(returnStatus => res.status(201).send({
                message: "Status submit succesfully",
                status: returnStatus
              })
            )
      })
      .catch(data => {
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
            .where('s.status_tail_number', status.status_tail_number)
            .then(returnStatus => {
              res.status(400).send({
                message: `Status with tail number of ${status.status_tail_number} already exists`,
                status: returnStatus
              })
            })
    })
  } else {
    res.status(400).send({
      message: isInputValidObject.error,
      status: status
    })
  }

});

// PATCH /status/:status_id

app.patch('/status/:status_id', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let status = req.body;
  delete status["status_id"]
  delete status["aircraft_name"]
  delete status["base_name"]

  let isInputValidObject = inputValidation(status);

  if (isInputValidObject.success === true) {
    knex('status')
      .where('status_id', req.params.status_id)
      .update(status)
      .then((data) => {
        if (data === 0){
        return res.status(404).json({
            message:
            'Status ID not found'
          })
        } else {
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
                  .where('s.status_tail_number', status.status_tail_number)
                  .then(returnStatus => {
                          res.status(200).send({
                            message: `Status ${req.params.status_id} has been updated`,
                            status: returnStatus
                          })
                  })
        }
      })
      .catch(err =>
          res.status(400).send({
          message: 'Invalid ID supplied'
          })
        );
  } else {
    res.status(400).send({
      message: isInputValidObject.error,
      status: status
    })
  }
});


// DELETE /status/:status_id

app.delete('/status/:status_id', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

function inputValidation(status) {
  const tailNumberValidationRegex = /\d{8}/;
  let isTailNumberValid = false;
  let isAircraftIdInt = false
  let isBaseIdInt = false
  let isFlyableBoolean = false;
  let isDiscriptionString = false;
  let isPriorityInt = false;

  if (tailNumberValidationRegex.test(status.status_tail_number) === true) {
    isTailNumberValid = true;
  } else {
    return {
      success: false,
      error: `Your status_tail_number input is invalid. Please use a string of only 8 digits.`
    }
  }
  if (typeof status.aircraft_id === typeof 0) {
    isAircraftIdInt = true;
  } else {
    return {
      success: false,
      error: `Your aircraft_id datatype is invalid. Please use a number.`
    }
  }
  if (typeof status.base_id === typeof 0) {
    isBaseIdInt = true
  } else {
    return {
      success: false,
      error: `Your base_id datatype is invalid. Please use a number.`
    }
  }
  if (typeof status.status_is_flyable === typeof true) {
    isFlyableBoolean = true;
  } else {
    return {
      success: false,
      error: `Your status_is_flyable datatype is invalid. Please a boolean.`
    }
  }
  if (typeof status.status_description === typeof 'string') {
    isDiscriptionString = true;
  } else {
    return {
      success: false,
      error: `Your status_description datatype is invalid. Please use a string.`
    }
  }
  if (typeof status.status_priority === typeof 0) {
    isPriorityInt = true;
  } else {
    return {
      success: false,
      error: `Your status_priority datatype is invalid. Please use a number.`
    }
  }
  if (isAircraftIdInt === true && isBaseIdInt === true && isFlyableBoolean === true && isDiscriptionString === true && isPriorityInt === true && isTailNumberValid === true) {
    return {
      success: true,
      error: "none"
    }
  }
}


module.exports = app;