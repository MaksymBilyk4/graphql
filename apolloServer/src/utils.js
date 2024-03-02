const jwt = require("jsonwebtoken");
const APP_SECRET = "APP_SECRET";

const getTokenPayload = token => jwt.verify(token, APP_SECRET);

const getUserId  = (req, authToken) => {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            if (!token) throw new Error("Token not found!");
            return getTokenPayload(token);
        }
    } else if (authToken) {
        return getTokenPayload(authToken);
    }

    throw new Error("Not Authorized!");
}

module.exports = {
    APP_SECRET,
    getUserId
}