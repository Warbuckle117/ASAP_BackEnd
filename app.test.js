const { response } = require('express');
const request = require('supertest');
const app = require('./app.js');


// describe('root route', () => {
//     it('returns all list items in list on /status', async (done) => {
//         await request(app)
//         .get('/status')
//         .then((response) => {
//             expect(response.status).toBe(200)
//             expect(response.type).toBe('application/json')
//         })
//         .done()
//     });

// })

test('GET /', async () => {
    

    await request(app)
        .get('/')
        .then((response, request) =>{
            expect(200),
            expect(response.text).toEqual("info at other endpoints.")
            // console.log("This should be the response: ", response.text)
            // console.log("This should be the request: ", request)
        })
        
    
        // .expect(response.body).toEqual("info at other endpoints.")
        
});

// test('GET /status', async () => {
    

//     await request(app)
//         .get('/status')
//         .then((response, request) =>{
//             expect(200),
//             // expect(response.text).toEqual("info at other endpoints."),
//             console.log("This should be the response: ", response)
//             // console.log("This should be the request: ", request)
//         })
        
        
//         // .expect(response.body).toEqual("info at other endpoints.")
        
// });