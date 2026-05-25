const errorHandler = (err, req, res, next) => {

    console.error(err);

    // INVALID MONGODB ID
    if (err.name === "CastError") {
        return res.status(400).json({
            error: "Invalid ID format"
        });
    }

    // VALIDATION ERROR
    if (err.name === "ValidationError") {
        return res.status(400).json({
            error: err.message
        });
    }

    res.status(500).json({
        error: "Internal Server Error"
    });

};

module.exports = errorHandler;