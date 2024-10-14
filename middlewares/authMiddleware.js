const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message : "token tidak valid atau kadaluarsa"});
   } // Forbidden

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
        return res.status(401).json({
            status: 108,
            message: "token tidak valid atau kadaluarsa",
            data: null 
        });
     } // Unauthorized
    req.email = decoded.email;
    next();
  });
}

module.exports = verifyToken;