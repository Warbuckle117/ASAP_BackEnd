const { response } = require('express');
const request = require('supertest');
const app = require('./app.js');

describe("These are the tests for GET", () => {

    test('GET /', async () => {
        const testVariable = "info at other endpoints.";
        
        return await request(app)
            .get('/')
            .then((response, request) =>{
                expect(200),
                expect(response.text).toEqual(testVariable)
                // console.log("This should be the response: ", response.text)
                // console.log("This should be the request: ", request)
            })
    });

    test('GET /status', async () => {

        return await request(app)
            .get('/status')
            .then((response, request) =>{

                expect(response.statusCode).toEqual(200)
                expect(response.body[0].status_id).toStrictEqual(1)
                // console.log("This should be the response.body: ", response.body[0].status_id)
                // console.log("This should be the request: ", request)
            })
    });
    

    test('GET /status/1', async () => {

        return await request(app)
            .get('/status/1')
            .then((response, request) =>{

                expect(response.statusCode).toEqual(200)
                expect(response.body[0].status_id).toStrictEqual(1)
                // console.log("This should be the response.body: ", response.body[0].status_id)
                // console.log("This should be the request: ", request)
            })
    });

    test('GET /status?limit=50&&offset=0', async () => {
        const expectedPath = "/status?limit=30&&offset=0";

        return await request(app)
            .get('/status?limit=30&&offset=0')
            .then((response, request) =>{
                // console.log("response.req.path: ", response.body)
                expect(response.statusCode).toEqual(200)
                expect(response.req.path).toEqual(expectedPath)
                expect(response.body.length).toEqual(30)
                // console.log("This should be the response.body: ", response.body[0].status_id)
                // console.log("This should be the request: ", request)
            })
    });

    test('GET /status/144 Status ID not found', async () => {
        const testVariable = 'Status ID not found';

        return await request(app)
            .get('/status/144')
            .then((response, request) =>{
                expect(response.statusCode).toEqual(404)
                expect(response.body.error).toEqual(testVariable)
                // console.log("This should be the response.body: ", response.body[0].status_id)
                // console.log("This should be the request: ", request)
            })
    });

    test('GET /status/abc Invalid ID supplied', async () => {
        const testVariable = 'Invalid ID supplied';

        return await request(app)
            .get('/status/abc')
            .then((response, request) =>{
                expect(response.statusCode).toEqual(400)
                expect(response.body.error).toEqual(testVariable)
                // console.log("This should be the response.body: ", response.body[0].status_id)
                // console.log("This should be the request: ", request)
            })
    });

    test('GET /aircraft', async () => {
        
        return await request(app)
            .get('/aircraft')
            .then((response, request) =>{
                expect(200)
                // console.log("This should be the response: ", response.text)
                // console.log("This should be the request: ", request)
            })
    });

    test('GET /base', async () => {

        return await request(app)
            .get('/base')
            .then((response, request) =>{
                expect(200)
                // console.log("This should be the response: ", response.text)
                // console.log("This should be the request: ", request)
            })
    });

    it("This is the end test", () => {
        expect(true).toEqual(true)
        
    })
})

describe("These are the tests for all the POST", () => {

    test('POST /status with correct info', async () => {
        const testVariable = "Status For 44226688 Created Successfully";

        return await request(app)
        .post('/status')
        .send({ "status_tail_number": "44226688", "aircraft_id": 1, "base_id": 1, "status_is_flyable": true, "status_description": "I'm a post all day every day", "status_priority": 1})
        .then((data) => {
            //   console.log("POST /status response", response)
            //   console.log(" data.request.body: ", data.body.message)
            expect(data.statusCode).toEqual(201)
            expect(data.body.message).toEqual(testVariable)
        })
    });

    test('POST /status Tail Number already exists', async () => {
        const testVariable = "Error: Status with tail number 44226688 already exists.";

        return await request(app)
        .post('/status')
        .send({ "status_tail_number": "44226688", "aircraft_id": 1, "base_id": 1, "status_is_flyable": true, "status_description": "I'm a post all day every day", "status_priority": 1})
        .then((data) => {
            //   console.log("POST /status response", response)
            //   console.log(" data.request.body: ", data.body.message)
            expect(data.statusCode).toEqual(400)
            expect(data.body.error).toEqual(testVariable)
        })
    });
    it("This is the end test", () => {
        expect(true).toEqual(true)
        
    })
})

describe("These are the tests for all the PATCH", () => {

    test('PATCH  /status/44', async () => {
        const testVariable = "Status of 44226688 Updated Successfully";
        const expectedStatusDescription = "Welcome to the Thunderdome";

        return await request(app)
        .patch('/status/44')
        .send({
            "status_tail_number": "44226688",
            "aircraft_id": 1,
            "aircraft_name": "A-10C Thunderbolt II",
            "base_id": 1,
            "base_name": "Altus AFB",
            "status_is_flyable": true,
            "status_description": "Welcome to the Thunderdome",
            "status_priority": 1
            })
            .then((data) => {
                // console.log(" data.body.messege: ", data.body.message)
                // console.log("data.body: ", data.body)
                expect(data.body.message).toEqual(testVariable)
                expect(data.body.status[0].status_description).toEqual(expectedStatusDescription)
            })
    });

    test('PATCH  /status/144 Status ID does not exist', async () => {
        const testVariable = "Status ID not found";
        // const expectedStatusDescription = undefined;

        return await request(app)
        .patch('/status/144')
        .send({
            "status_tail_number": "44226688",
            "aircraft_id": 1,
            "aircraft_name": "A-10C Thunderbolt II",
            "base_id": 1,
            "base_name": "Altus AFB",
            "status_is_flyable": true,
            "status_description": "Welcome to the Thunderdome",
            "status_priority": 1
            })
            .then((data) => {
                // console.log(" data.body.messege: ", data.body.message)
                // console.log("data.body: ", data.body)
                expect(data.body.error).toEqual(testVariable)
                expect(data.statusCode).toEqual(404)
                // expect(data.body.status[0].status_description).toEqual(expectedStatusDescription)
            })
    });

    test('PATCH  /status/abc Invalid Status ID', async () => {
        const testVariable = 'Invalid ID supplied';
        // const expectedStatusDescription = undefined;

        return await request(app)
        .patch('/status/abc')
        .send({
            "status_tail_number": "44226688",
            "aircraft_id": 1,
            "aircraft_name": "A-10C Thunderbolt II",
            "base_id": 1,
            "base_name": "Altus AFB",
            "status_is_flyable": true,
            "status_description": "Welcome to the Thunderdome",
            "status_priority": 1
            })
            .then((data) => {
                // console.log(" data.body.messege: ", data.body.message)
                // console.log("data.body: ", data.body)
                expect(data.body.error).toEqual(testVariable)
                expect(data.statusCode).toEqual(400)
                // expect(data.body.status[0].status_description).toEqual(expectedStatusDescription)
            })
    });

    it("This is the end test", () => {
        expect(true).toEqual(true)
        
    })
})

describe("These are the tests for all the DELETE", () => {

    test('Delete /status/44', async () => {
        const testVariable = 'Status 44 Deleted Successfully';

        return await request(app)
        .delete('/status/44')
        .then((data) => {
            //   console.log(" data.body.statusCode: ", data.statusCode)
            //   console.log(" data.body: ", data.body)
            expect(data.statusCode).toEqual(200)
            expect(data.body.message).toEqual(testVariable)
        })
    });

    test('Delete /status/144 Status ID not found', async () => {
        const testVariable = "Status ID not found";

       return await request(app)
        .delete('/status/144')
        .then((data) => {
            //   console.log(" data.body.statusCode: ", data.statusCode)
            //   console.log(" data.body: ", data.body)
            expect(data.statusCode).toEqual(404)
            expect(data.body.error).toEqual(testVariable)
        })
    });

    test('Delete /status/abc Invalid Status ID', async () => {
        const testVariable = 'Invalid ID supplied';

       return await request(app)
        .delete('/status/abc')
        .then((data) => {
            //   console.log(" data.body.statusCode: ", data.statusCode)
            //   console.log(" data.body: ", data.body)
            expect(data.statusCode).toEqual(400)
            expect(data.body.error).toEqual(testVariable)
        })
    });




    it("This is the end test", () => {
        expect(true).toEqual(true)
        
    })
})