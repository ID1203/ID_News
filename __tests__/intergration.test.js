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
describe.only('/api/articles/:article_id', () => {
    it('should return articles', () => {
        return request(app)
        .get('/api/articles/3')
        .expect(200)
        .then((response) => {
            response.body.forEach((article) => {
                expect(article.article_id).toBe(3);
                expect(article.title).toBe('Eight pug gifs that remind me of mitch');
                expect(article.topic).toBe('mitch');
                expect(article.author).toBe('icellusedkars');
                expect(article.body).toBe('some gifs');
                expect(article.created_at).toBe('2020-11-03T09:12:00.000Z');
                expect(article.votes).toBe(0);
                expect(article.article_img_url).toBe('https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700');
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
    it('GET:400 sends an appropriate status and error message when ivalid id is given', () => {
        return request(app)
        .get('/api/articles/banna')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
        });
    });
    
})
describe('/api/articles', () => {
    it('should respond with all articles ', () => {
        return request(app).get('/api/articles')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body))
            response.body.articles.forEach((article) => {
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


