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
            expect(response.body[0].article_id).toBe(3);
            expect(response.body[0].author).toBe('icellusedkars');
            expect(response.body[0].topic).toBe('mitch');
        
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
describe('/api/articles/:article_id/comments', () => {
    it('should return comments of article based on id', () => {
        return request(app).get('/api/articles/1/comments')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body))
            response.body.forEach((comment) => {
                expect(comment.hasOwnProperty('comment_id')).toBe(true)
                expect(comment.hasOwnProperty('body')).toBe(true)
                expect(comment.hasOwnProperty('article_id')).toBe(true)
                expect(comment.hasOwnProperty('author')).toBe(true)
                expect(comment.hasOwnProperty('votes')).toBe(true)
                expect(comment.hasOwnProperty('created_at')).toBe(true)
            })
        })
    });
    // it('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
    //     return request(app)
    //     .get('/api/articles/300000/comments')
    //     .expect(404)
    //     .then((response) => {
    //         expect(response.body.msg).toBe('Not Found');
    //     });
    // });
    // it('GET:400 sends an appropriate status and error message when given invalid id', () => {
    //     return request(app)
    //     .get('/api/articles/banana/comments')
    //     .expect(400)
    //     .then((response) => {
    //         expect(response.body.msg).toBe('Bad Request');
    //     });
    // });
})

