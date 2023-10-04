const express = require("express");
const app = express();
const { getTopics, getEndpoints, getArticlesByID } = require('./Controllers/Controller');
const erroHandler = require("./Controllers/Error.Controller");


app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticlesByID);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.name = 'NotFoundError'
    error.status = 404;
    next(error);
});

app.use(erroHandler) 
    


module.exports = app