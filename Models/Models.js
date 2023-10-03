const db = require('../db/connection')
const endpoints = require('../endpoints.json')

    function fetchTopics(){
        console.log('in model part 1 ')
        return db.query('SELECT * FROM topics;')
        .then((result) => {
            console.log('in controller part 2 ')
            return result.rows;
        })
}   
function getAllEndpoints(){
    return endpoints
}

module.exports = { fetchTopics, getAllEndpoints }   