const jwt = require('jsonwebtoken');
const passkey = "aabra-ka-daabra";

function userAuthorization(req, res, next) {
    try {
        let auth = req.headers.authorization;
        let token = auth.split(' ');
        console.log(token[1]);
        let verify = jwt.verify(token[1], passkey);
        console.log(verify);
        if(verify) {
            req.id = verify._id;
            next();
        } else {
            res.status(400).json({message: "Bad request."});

        }
    } catch(error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }
    
}

module.exports = {userAuthorization, passkey};