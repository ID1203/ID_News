
const { fetchTopics, getAllEndpoints } = require("../Models/Models")

function getTopics(req, res, next){
    console.log('in controller part 1 ');
    fetchTopics()
    .then((topics) => {
        console.log('in controller part 2 ')
        res.status(200).send({ topics });
    }).catch((err) => {
        next(err)
    })
}


function getEndpoints(req, res, next) {
    const endpointsObject = getAllEndpoints()
    res.status(200).json(endpointsObject);
}

module.exports = { getTopics, getEndpoints }

