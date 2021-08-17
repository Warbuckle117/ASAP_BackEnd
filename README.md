# ASAP_BackEnd

this is the backend repo for the ASAP, Aircraft Status and Position web application.

## Installation instructions
For general use

> npm install express knex pg --save

Needed for development

> npm install --save-dev jest supertest nodemon

Also requires a docker continer with a postgresql database.

Be sure to edit the knexfile.js with the connection information for your database.

## End Points

### /status

Accepts GET and POST 
Use for a collection of current aircraft and their status.
Or to post a new status.

###  /status/:status_id

Accepts GET, PATCH and DELETE

Request a single status or patch/delete a status by status id.

### /base

Accepts GET only.
Provides a list of bases currently in the database.

### /aircraft
Accepts GET only.
Provides a list of aircraft models  currently in the database.

### template for POST and Patch

```
    {
        "status_tail_number": string,
        "aircraft_id": int,
        "base_id": int,
        "status_is_flyable": boolean,
        "status_description": string,
        "status_priority": int
    }
```



## Contributors

Cherokee Walters: [cwalters162](https://github.com/cwalters162)

Mark Arbuckle: [warbuckle117](https://github.com/Warbuckle117)