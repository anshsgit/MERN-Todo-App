const jwt = require('jsonwebtoken');
const passkey = "aabra-ka-daabra";

function userAuthorization(req, res, next) {
    let auth = req.headers.authorization;
    let token = auth.split(' ');
    let verify = jwt.verify(token[1], passkey);
    if(verify) {
        req.id = verify._id;
        next();
    } else {
        res.status(400).json({message: "Bad request."});
    }
}

module.exports = {userAuthorization, passkey};