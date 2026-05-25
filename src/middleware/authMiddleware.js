const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    try {

        // GET TOKEN FROM HEADER
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                error: "No token provided"
            });
        }

        // TOKEN FORMAT:
        // Bearer eyJhbGci...

        const token = authHeader.split(" ")[1];

        // VERIFY TOKEN
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // SAVE USER INFO
        req.user = decoded;

        next();

    } catch (err) {

        res.status(401).json({
            error: "Invalid token"
        });

    }

};

module.exports = authMiddleware;