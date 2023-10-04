function erroHandler(err, req, res, next){
    console.log(err.stack);

    if(err.name === 'NotFoundError'){
        return res.status(404).json({ msg: "Not Found" });
    }else if (err.name === "BadRequestError") {
        return res.status(400).json({ msg: "Bad Request" });
    }

    res.status(500).json({msg: "Internal Server Error"})
}

module.exports = erroHandler