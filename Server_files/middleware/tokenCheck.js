require('dotenv').config();
const jwt = require("jsonwebtoken");

function validTokenTest (req, res, next) {
    const token = req.header("token");
    console.log(token);
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }
  
    try {
      const verify = jwt.verify(token, `${process.env.jwtSecret}`);
      req.user = verify.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = validTokenTest;