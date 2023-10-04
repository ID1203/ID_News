exports.handlePSQLErrors = (err, req, res, next) => {
    if(err.code === '22P02'){
        return res.status(400).send({ msg: "Bad Request" });
    }else{
        next(err)
    }
}

exports.handleCustomError = (err, req, res, next) => {
    if(err.status){
        res.status(err.status).send({ msg: err.msg })
    }else{
        next(err)
    }
}

exports.handle500Errors = (err, req, res, next) => {
    res.status(500).send({msg: "Internal Server Error"})
}

