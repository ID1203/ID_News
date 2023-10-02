const request = require("supertest");
const seed = require('../db/seeds/seed')
const app = require('../app.js')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')

beforeEach(() => {
    return seed(data);
});
  
afterAll(() => db.end());

describe('/api/topics', () => {
    it('should respond with an array of topic objects ', () => {
        return request(app).get('/api/topics')
        .expect(200).then((response) => {
            expect(Array.isArray(response.body))
            expect(response.body.topics.length).toBe(3)
        })
    });
    it('Each topic object should have slug and description properties', async() => {
        return request(app).get('/api/topics').then((response) => {
            response.body.topics.forEach((topic) => {
                expect(topic.hasOwnProperty('slug')).toBe(true)
                expect(topic.hasOwnProperty('description')).toBe(true)
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