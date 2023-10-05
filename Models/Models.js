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
        return result.rows
    })
}

function insertIntoComments(article_id, username, body){
    
    return db.query('SELECT * FROM comments WHERE articles.article_id = $1;', 
    [article_id], () => {
        return db.query(`INSERT INTO comments (username, body) VALUES (1$, 2$) RETURNING *; `,
        [username, body])
    })
}



module.exports = { fetchTopics, getAllEndpoints, fetchArticlesById, insertIntoComments }   

