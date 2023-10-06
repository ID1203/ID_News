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
        .get('/api/articles/banana')
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
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
    it('should return 200 for an article that exist with no comments', () => {
        return request(app).get('/api/articles/2/comments')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body))
            expect(response.body.length).toBe(0)
        })
    });
    it('GET:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        return request(app)
        .get('/api/articles/300000/comments')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found');
        });
    });
    it('GET:400 sends an appropriate status and error message when given invalid id', () => {
        return request(app)
        .get('/api/articles/banana/comments')
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
            expect(new Date(response.body.articles[0].created_at).getTime()).toBeGreaterThan(new Date(response.body.articles[5].created_at).getTime())
            response.body.articles.forEach((article) => {
                expect(article).toHaveProperty('author');
                expect(article).toHaveProperty('title');
                expect(article).toHaveProperty('article_id');
                expect(article).toHaveProperty('topic');
                expect(article).toHaveProperty('created_at');
                expect(article).toHaveProperty('votes');
                expect(article).toHaveProperty('article_img_url');
                expect(article).toHaveProperty('comment_count');
                expect(article).not.toHaveProperty('body');
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
    it('should respond with all articles based on topic given in query ', () => {
        return request(app).get('/api/articles').query({ topic: 'mitch' })
        .expect(200)
        .then((response) => {
            response.body.articles.forEach((article) => {
                expect(article).toHaveProperty('author');
                expect(article).toHaveProperty('title');
                expect(article).toHaveProperty('article_id');
                expect(article).toHaveProperty('topic');
                expect(article).toHaveProperty('created_at');
                expect(article).toHaveProperty('votes');
                expect(article).toHaveProperty('article_img_url');
                expect(article).toHaveProperty('body');
            })
            
        })
    })
    it('should respond not found when passed invalid topic ', () => {
        return request(app).get('/api/articles').query({ topic: 'Isaac' })
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found')
        })
    })

})      


describe('POST /api/articles/:article_id/comments', () => {
    it('should return comment with data provided in body ', () => {
        const comment = { username: 'butter_bridge', body: 'yay it worked' }
        return request(app).post('/api/articles/1/comments')
        .send(comment)
        .expect(201)
        .then((response) => {
            expect(response.body).toHaveProperty('comment_id')
            expect(typeof response.body.comment_id).toBe('number')
            expect(response.body).toHaveProperty('author', comment.username)
            expect(response.body).toHaveProperty('article_id')
            expect(typeof response.body.article_id).toBe('number')
            expect(response.body).toHaveProperty('body', comment.body)
            expect(response.body).toHaveProperty('created_at')
            expect(typeof response.body.created_at).toBe('string')
        })
    });
    it('POST:404 sends an appropriate status and error message when given a valid but non-existent id', () => {
        const comment = { username: 'butter_bridge', body: 'yay it worked' }
        return request(app)
        .post('/api/articles/10000/comments')
        .send(comment)
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found');
        });
    });
    it('POST:404 sends an appropriate status and error message when given no id', () => {
        const comment = { username: 'butter_bridge', body: 'yay it worked' }
        return request(app)
        .post('/api/articles//comments')
        .send(comment)
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found');
        });
    });
    it('POST:400 sends an appropriate status and error message when given invalid id', () => {
        const comment = { username: 'butter_bridge', body: 'yay it worked' }
        return request(app)
        .post('/api/articles/banana/comments')
        .send(comment)
        .expect(400)
        .then((response) => {
            expect(response.body.msg).toBe('Bad Request');
        });
    });
    it('POST:400 sends an appropriate status and error message when given invalid username', () => {
        const comment = { username: 'Isaac', body: 'yay it worked' }
        return request(app)
        .post('/api/articles/1/comments')
        .send(comment)
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Not Found');
        });
    });
})

describe('/api/users', () => {
    it('should respond with an array of topic objects ', () => {
        return request(app).get('/api/users')
        .expect(200)
        .then((response) => {
            expect(Array.isArray(response.body))
            expect(response.body.users.length).toBe(4)
            response.body.users.forEach((user) => {
                expect(user.hasOwnProperty('username')).toBe(true)
                expect(typeof user.username).toBe('string')
                expect(user.hasOwnProperty('name')).toBe(true)
                expect(typeof user.name).toBe('string')
                expect(user.hasOwnProperty('avatar_url')).toBe(true)
                expect(typeof user.avatar_url).toBe('string')
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
