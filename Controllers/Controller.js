const { fetchTopics, getAllEndpoints } = require("../Models/Models")

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
    console.log(endpointsObject.text);
    res.status(200).send({endpointsObject});

}

module.exports = { getTopics, getEndpoints }