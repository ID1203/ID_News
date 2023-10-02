const express = require("express");
const app = express();
const { getTopics } = require('./Controllers/Controller')

app.use(express.json())

app.get('/api/topics', getTopics)

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(404).send({ msg: "Not Found" });
});

module.exports = app