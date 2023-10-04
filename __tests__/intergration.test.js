const request = require("supertest");
const seed = require('../db/seeds/seed')
const app = require('../app.js')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')
const endpointsData = require('../endpoints.json');

beforeEach(() => seed(data));
  
afterAll(() => db.end());

describe('/api/topics', () => {
    it('should respond with an array of topic objects ', () => {
        return request(app).get('/api/topics')
        .expect(200)
        .then((response) => {
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
describe('/api/articles/:article_id', () => {
    it('should return articles', () => {
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then((response) => {
            response.body.forEach((article) => {
                expect(article.article_id).toBe(3);
                expect(article.author).toBe('icellusedkars');
                expect(article.topic).toBe('mitch');
            })
            
        })
    });
    it('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/300000')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found');
        });
    });
})


// describe('POST /api/articles/:article_id/comments', () => {
//     it.only('should return comment with data provided in body ', () => {
//         return request(app).post('/api/articles/6/comments')
//         .send({ username: 'Isaac', body: 'yay it worked' })
//         .then((response) => {
//             console.log(response.body);
//         })
//     });
// })