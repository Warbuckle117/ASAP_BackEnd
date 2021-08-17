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

test('GET /status', async () => {
    let testVariable = [{"status_id":3,"status_tail_number":"15000303","aircraft_id":4,"base_id":4,"status_is_flyable":true,"status_description":"Da boom boom dropper","status_priority":2,"created_at":"2021-08-17T18:39:16.841Z","updated_at":"2021-08-17T18:39:16.841Z"}];
    await request(app)
        .get('/status/3')
        .expect(200)
        expect(response.body).toBe(testVariable)
});