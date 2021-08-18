const { response } = require('express');
const request = require('supertest');
const app = require('./app.js');

test('GET /', async () => {
    const testVariable = "info at other endpoints.";
    
    await request(app)
        .get('/')
        .then((response, request) =>{
            expect(200),
            expect(response.text).toEqual(testVariable)
            // console.log("This should be the response: ", response.text)
            // console.log("This should be the request: ", request)
        })
});

test('GET /status/1', async () => {

    await request(app)
        .get('/status/1')
        .then((response, request) =>{

            expect(response.statusCode).toEqual(200)
            expect(response.body[0].status_id).toStrictEqual(1)
            // console.log("This should be the response.body: ", response.body[0].status_id)
            // console.log("This should be the request: ", request)
        })
});

test('GET /aircraft', async () => {
    const testVariable = [{"aircraft_id": 1, "aircraft_name": "c-17"}, {"aircraft_id": 2, "aircraft_name": "f-16"}, {"aircraft_id": 3, "aircraft_name": "kc-135"}, {"aircraft_id": 4, "aircraft_name": "b-52"}];
    
    await request(app)
        .get('/aircraft')
        .then((response, request) =>{
            expect(200),
            expect(response.body).toEqual(testVariable)
            // console.log("This should be the response: ", response.text)
            // console.log("This should be the request: ", request)
        })
});

test('GET /base', async () => {
    const testVariable = [{"base_id": 1, "base_name": "Pope AFB"}, {"base_id": 2, "base_name": "JB Charleston"}, {"base_id": 3, "base_name": "Travis AFB"}, {"base_id": 4, "base_name": "Dover AFB"}];

    await request(app)
        .get('/base')
        .then((response, request) =>{
            expect(200),
            expect(response.body).toEqual(testVariable)
            // console.log("This should be the response: ", response.text)
            // console.log("This should be the request: ", request)
        })
});

test('POST /status', async () => {
    const testVariable = "Status submit succesfully";

    await request(app)
      .post('/status')
      .send({ "status_tail_number": "44226688", "aircraft_id": 1, "base_id": 1, "status_is_flyable": true, "status_description": "I'm a post all day every day", "status_priority": 1})
      .then((data) => {
        //   console.log("POST /status response", response)
        //   console.log(" data.request.body: ", data.body.message)
          expect(data.statusCode).toEqual(201)
          expect(data.body.message).toEqual(testVariable)
      })
});


test('PATCH  /status/1', async () => {
    const testVariable = "Status 1 has been updated";
    const expectedStatusDescription = "I'ma patch all day every day";

    await request(app)
      .patch('/status/1')
      .send({
        "status_tail_number": "15000666",
        "aircraft_id": 2,
        "base_id": 3,
        "status_is_flyable": true,
        "status_description": "I'ma patch all day every day",
        "status_priority": 3
        })
        .then((data) => {
            // console.log(" data.body.messege: ", data.body.message)
            // console.log("data.body: ", data.body)
            expect(data.body.message).toEqual(testVariable)
            expect(data.body.status[0].status_description).toEqual(expectedStatusDescription)
        })
});


test('Delete /status/5', async () => {
    const testVariable = 'Status 5 has been deleted';

    await request(app)
      .delete('/status/5')
      .then((data) => {
        //   console.log(" data.body.statusCode: ", data.statusCode)
        //   console.log(" data.body: ", data.body)
        expect(data.statusCode).toEqual(200)
        expect(data.body.message).toEqual(testVariable)
      })
});