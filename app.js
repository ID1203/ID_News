const express = require("express");
const app = express();

const { 
    getTopics, 
    getEndpoints, 
    getArticlesByID, 
    getArticles, 
    getArticleCommentsById,
    postArticleComments, 
    patchArticlebyId 
} = require('./Controllers/Controller');

const erroHandler = require("./Controllers/Error.Controller");


app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticlesByID);

app.post('/api/articles/:article_id/comments', postArticleComments)

app.get('/api/articles/:article_id/comments', getArticleCommentsById)

app.get('/api/articles', getArticles)

app.patch('/api/articles/:article_id', patchArticlebyId )

app.all('/*', (req, res, next) => {
    return res.status(404).send({ msg: "Not Found" });
});

app.use(erroHandler.handlePSQLErrors) 

app.use(erroHandler.handleCustomError) 

app.use(erroHandler.handle500Errors) 



module.exports = app