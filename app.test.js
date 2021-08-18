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
        
    
        // .expect(response.body).toEqual("info at other endpoints.")
        
});

// test('GET /status', async () => {
//     const testVariable = [{"status_id":1,"status_tail_number":"15000101","aircraft_id":1,"aircraft_name":"c-17","base_id":2,"base_name":"JB Charleston","status_is_flyable":true,"status_description":"I move lots of shit","status_priority":1,"updated_at":"2021-08-18T14:53:02.039Z"},{"status_id":2,"status_tail_number":"15000202","aircraft_id":2,"aircraft_name":"f-16","base_id":1,"base_name":"Pope AFB","status_is_flyable":false,"status_description":"A nice airshow jet","status_priority":1,"updated_at":"2021-08-18T14:53:02.039Z"},{"status_id":3,"status_tail_number":"15000303","aircraft_id":4,"aircraft_name":"b-52","base_id":4,"base_name":"Dover AFB","status_is_flyable":true,"status_description":"Da boom boom dropper","status_priority":2,"updated_at":"2021-08-18T14:53:02.039Z"}];
    

//     await request(app)
//         .get('/status')
//         .then((response, request) =>{
//             expect(200),
//             expect(response.body).toEqual(testVariable)
//             // console.log("This should be the response: ", response.text)
//             // console.log("This should be the request: ", request)
//         })
        
    
//         // .expect(response.body).toEqual("info at other endpoints.")
        
// });

// 5 tests complete for all GETs
test('GET /status/1', async () => {
    const testVariable = [{ status_id: 1, status_tail_number: '15000101', aircraft_id: 1, aircraft_name: 'c-17', base_id: 2, base_name: 'JB Charleston', status_is_flyable: true, status_description: 'I move lots of shit', status_priority: 1, updated_at: '2021-08-18T14:53:02.039Z'}];

    await request(app)
        .get('/status/1')
        .then((response, request) =>{
            expect(200),
            expect(response.body).toStrictEqual(testVariable)
            // console.log("This should be the response: ", response)
            // console.log("This should be the request: ", request)
        })
        
        
        // .expect(response.body).toEqual("info at other endpoints.")
        
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
        
    
        // .expect(response.body).toEqual("info at other endpoints.")
        
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
        
    
        // .expect(response.body).toEqual("info at other endpoints.")
        
});

test('POST /status', async () => {
    const testVariable = "info at other endpoints.";


    request(app)
      .post('/status')
      .send({ "status_tail_number": "00002222", "aircraft_id": 1, "base_id": 1, "status_is_flyable": true, "status_description": "I'm a post all day every day", "status_priority": 1})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
});


test('PATCH  /status', async () => {
    const testVariable = "info at other endpoints.";


    request(app)
      .patch('/status')
      .send({
        "status_tail_number": "15000666",
        "aircraft_id": 2,
        "base_id": 3,
        "status_is_flyable": true,
        "status_description": "I'ma patch all day every day",
        "status_priority": 3
        })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      

});