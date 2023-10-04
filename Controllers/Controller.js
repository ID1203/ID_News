
const { fetchTopics, getAllEndpoints, fetchArticlesById, fetchAllArticles } = require("../Models/Models")

function getTopics(req, res, next){
    fetchTopics()
    .then((topics) => {
        res.status(200).send({ topics });
    }).catch((err) => {
        next(err)
    })
}

function getEndpoints(req, res, next) {
    const endpointsObject = getAllEndpoints()
    res.status(200).json(endpointsObject);
}

function getArticles(req, res, next){
    fetchAllArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch((err) => {
        next(err)
    })
}

function getArticlesByID(req, res, next) {
    const { article_id } = req.params;
    fetchArticlesById(article_id)
    .then((article) => {
        res.status(200).json(article)
    })
    .catch((err) => {
        next(err)
    })
}

module.exports = { getTopics, getEndpoints, getArticlesByID, getArticles }

