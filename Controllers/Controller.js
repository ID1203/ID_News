const model = require("../Models/Models");
const { response } = require("../app");


function getTopics(req, res, next){
    model.fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    }).catch((err) => {
        next(err)
    })
}

function getEndpoints(req, res, next) {
    const endpointsObject = model.getAllEndpoints()
    res.status(200).json(endpointsObject);
}

function getArticles(req, res, next){
    const { topic } = req.query;
    model.fetchAllArticles(topic)
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch((err) => {
        next(err)
    })
}

function getArticlesByID(req, res, next) {
    const { article_id } = req.params;
    model.fetchArticlesById(article_id)
    .then((article) => {
        res.status(200).json(article)
    })
    .catch((err) => {
        next(err)
    })
}
function getArticleCommentsById(req, res, next){
    const { article_id } = req.params;
    model.fetchArticlesById(article_id).then(() => {
        return model.festchArticleCommentsById(article_id)
    }).then((comment) => {
        res.status(200).json(comment)
    })
    .catch((err) => {
        next(err)
    })
}

function postArticleComments(req, res, next) {
    const { article_id } = req.params
    const { username, body } = req.body
    model.insertIntoComments(article_id, username, body)
    .then((result) => {
        res.status(201).send(result)
    }).catch((err) => {
        next(err)
    })
}

function getUsers(req, res, next){
    model.fetchusers()
    .then((users) => {
        res.status(200).send({ users });
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getTopics, getEndpoints, getArticlesByID, postArticleComments, getArticles, getArticleCommentsById, getUsers }


