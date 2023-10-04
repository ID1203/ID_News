const db = require('../db/connection')

const endpoints = require('../endpoints.json')

function fetchTopics(){
    return db.query('SELECT * FROM topics;')
    .then((result) => {
        return result.rows;
    })
}   

function getAllEndpoints(){
    return endpoints
}

function fetchArticlesById(article_id){
    return db.query('SELECT * FROM articles WHERE articles.article_id = $1;', 
    [article_id])
    .then((result) => {
        if (result.rows.length === 0) {
           return Promise.reject({ status: 404, msg: "Not Found" })
        }
        return result.rows
    })
}

function fetchAllArticles(){
    const getQuery = `SELECT 
    articles.article_id,
    articles.title, 
    articles.created_at, 
    articles.votes, 
    articles.article_img_url, 
    articles.topic, 
    articles.author, 
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC`
    return db.query(getQuery)
    .then((result) => {
        return result.rows;
    })
}   



module.exports = { fetchTopics, getAllEndpoints, fetchArticlesById, fetchAllArticles }   

