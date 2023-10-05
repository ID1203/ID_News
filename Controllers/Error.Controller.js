exports.handlePSQLErrors = (err, req, res, next) => {
    console.log(err.code);
    if(err.code === '22P02'){
        return res.status(400).send({ msg: "Bad Request" });
    }
    else if (err.code === '23503'){
        return res.status(404).send({ msg: "username not found" });
    }
    else{
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

