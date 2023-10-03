const request = require("supertest");
const seed = require('../db/seeds/seed')
const app = require('../app.js')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')
const endpointsData = require('../endpoints.json');



beforeEach(() => {
    return seed(data);
});
  
afterAll(() => db.end());

describe('/api/topics', () => {
    it('should respond with an array of topic objects ', () => {
        return request(app).get('/api/topics')

        .expect(200)
        .then((response) => {
            console.log('Response Body:', response.body); 
            expect(Array.isArray(response.body))
            expect(response.body.topics.length).toBe(3)
            response.body.topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true)
                expect(typeof topic.slug).toBe('string')
                expect(topic.hasOwnProperty('description')).toBe(true)
                expect(typeof topic.description).toBe('string')
            })
        })
    });


    it('should respond not found for invalid endpoint', () => {
        return request(app).get('/api/invalid-endpoint')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found')
        })
    });
})      
describe('/api', () => {
    it('should respond with an object describing all available endpoints', () => {
        return request(app).get('/api')
        .expect(200)
        .then((response) => {
            expect(response.body).toEqual(endpointsData)
            expect(typeof response.body).toBe('object')
        })
    });
});
})

