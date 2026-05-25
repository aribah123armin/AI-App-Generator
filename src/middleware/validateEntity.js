const validateEntity = (req, res, next) => {

    try {

        // CHECK BODY EXISTS
        if (!req.body) {
            return res.status(400).json({
                error: "Request body missing"
            });
        }

        // CHECK BODY IS OBJECT
        if (typeof req.body !== "object") {
            return res.status(400).json({
                error: "Invalid JSON format"
            });
        }

        next();

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};

module.exports = validateEntity;