require("dotenv").config();
const jwt = require("jsonwebtoken");

function jwtGenerator(username) {
  const payload = {
    user: username,
  };

  return jwt.sign(payload, `${process.env.jwtSecret}`, { expiresIn: "8h" });
}

module.exports = jwtGenerator;
