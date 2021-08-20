const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')['development']);
const cors = require('cors');
const limitNumber = 2147483647;

//CONFIG STUFF
const PORT = process.env.PORT || 3001;
const hostURL = `http://localhost:${PORT}`

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
        error:
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
        error:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

// GET /status
// GET /status?

app.get('/status', function(req, res) {
  let limit = req.query.limit || limitNumber;
  let offset = req.query.offset || 0

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (limit != limitNumber || offset != 0) {
    knex({s: knex('status').limit(limit).offset(offset)})
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
          error:
            'The data you are looking for could not be found. Please try again'
        })
      );
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
    .orderBy('s.status_id')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        error:
          'The data you are looking for could not be found. Please try again'
      })
    );
  }
});

//GET /status2

app.get('/status2', function(req, res) {
  let limit = req.query.limit || limitNumber;
  let offset = req.query.offset || 0;
  let count = 0;

  res.setHeader("Access-Control-Allow-Origin", "*");

  knex('status').count('status_id').then((data)=>setCount(data));

  if (limit != limitNumber || offset != 0) {
    knex({s: knex('status').limit(limit).offset(offset)})
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
      .then(data => {
        count = parseInt(count[0].count)
        let previousOffset = parseInt(offset) - parseInt(limit);
        let nextOffset = parseInt(offset) + parseInt(limit);
        let previousURL = "";
        let nextURL = "";
        
        if (offset < 0){
          previousURL = null;
          nextURL = `${hostURL}/status2?limit=${limit}&offset=${(nextOffset)}`;
        } else if ( offset >= count ){
          previousURL = `${hostURL}/status2?limit=${limit}&offset=${(previousOffset)}`;
          nextURL = null;
        } else {
          previousURL = `${hostURL}/status2?limit=${limit}&offset=${(previousOffset)}`;
          nextURL = `${hostURL}/status2?limit=${limit}&offset=${(nextOffset)}`;
        }
        
        res.status(200).send({
          count: count,
          next: nextURL,
          previous: previousURL,
          results: data
        })
        
      })
      .catch(err =>
        res.status(404).json({
          error:
            'The data you are looking for could not be found. Please try again'
        })
      );
  } else {
    res.status(400).send({
      error: "Error: please input a limit and offset."
    })
  }

  function setCount (value) {
    count = value;
  }
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
                error:
                'Status ID not found'
            })
            } else {
            return res.status(200).json(data)
            }
    })
    .catch(err =>
        res.status(400).json({
        error:
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
                message: `Status For ${status.status_tail_number} Created Successfully`,
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
                error: `Error: Status with tail number ${status.status_tail_number} already exists.`,
                status: returnStatus
              })
            })
    })
  } else {
    res.status(400).send({
      error: isInputValidObject.error,
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
            error:
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
                            message: `Status of ${status.status_tail_number} Updated Successfully`,
                            status: returnStatus
                          })
                  })
        }
      })
      .catch(err =>
          res.status(400).send({
          error: 'Invalid ID supplied'
          })
        );
  } else {
    res.status(400).send({
      error: isInputValidObject.error,
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
          error:
          'Status ID not found'
      })
      } else {
          setDeletedRow(data)
          knex('status')
          .where('status_id', req.params.status_id)
          .del()
          .then((data) => {
            return res.status(200).send({
              message: `Status ${req.params.status_id} Deleted Successfully`,
              status: deletedRow
            })
          })
      }
    })
    .catch(err =>
        res.status(400).json({
        error:
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
      error: `Error: Tail Number Invalid. Should Be 8 Digit Numeric. Ex. 12003456`
    }
  }
  if (typeof status.aircraft_id === typeof 0) {
    isAircraftIdInt = true;
  } else {
    return {
      success: false,
      error: `Error: Please Select an Aircraft Type.`
    }
  }
  if (typeof status.base_id === typeof 0) {
    isBaseIdInt = true
  } else {
    return {
      success: false,
      error: `Error: Please Select a Base.`
    }
  }
  if (typeof status.status_is_flyable === typeof true) {
    isFlyableBoolean = true;
  } else {
    return {
      success: false,
      error: `Error: Please Select Maintenance Status.`
    }
  }
  if (typeof status.status_description === typeof 'string') {
    isDiscriptionString = true;
  } else {
    return {
      success: false,
      error: `Error: Invalid Input in Description.`
    }
  }
  if (typeof status.status_priority === typeof 0) {
    isPriorityInt = true;
  } else {
    return {
      success: false,
      error: `Error: Please Select Maintenance Priority.`
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