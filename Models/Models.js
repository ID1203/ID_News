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

module.exports = { fetchTopics, getAllEndpoints }   