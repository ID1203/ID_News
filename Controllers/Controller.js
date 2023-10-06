const model = require("../Models/Models");



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
    model.fetchAllArticles()
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

function patchArticlebyId(req, res, next){
    const { article_id } = req.params
    const newVotes  = req.body.incVote
    model.updateArticles(newVotes, article_id)
    .then((result) => {
        res.status(201).send(result)
    }).catch((err) => {
        next(err)
    })
}

module.exports = { getTopics, getEndpoints, getArticlesByID, postArticleComments, getArticles, getArticleCommentsById, patchArticlebyId }


