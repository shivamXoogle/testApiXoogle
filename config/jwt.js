const jwt = require('jsonwebtoken');
const ERROR = require('./ERROR');
require('dotenv').config();
const TOKEN_SECRET = process.env.JWT_SECRET;

module.exports = {
    generate: (userId = 0) => {
        return {
            authToken: jwt.sign({
                userId: userId
            }, TOKEN_SECRET)
        }
    },
    verify: async(req, res, next) => {
        // req.user = {
        //     ID: req.params.userID
        // };
        // next();
        // return;

        const token = req.header('authToken');
        const userId = req.header('userId');
        if (!token || !userId) {
            const customErr = ERROR.ACCESS_DENIED;
            return res.status(customErr.status).json({
                message: customErr.message,
                error: customErr.error
            });
        }
        try {
            const verified = jwt.verify(token, TOKEN_SECRET);
            if (userId != verified.userId)
                throw '';
            req.user = verified;
            next();
        } catch (err) {
            const customErr = ERROR.INVALID_AUTH;
            return res.status(customErr.status).json({
                message: customErr.message
            });
        }
    }
}