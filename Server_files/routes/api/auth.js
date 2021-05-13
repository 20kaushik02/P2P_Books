const express = require('express');
const router = express.Router();
const db = require("../../DB_files");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../jwtGenerator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function testMissing (req, res, next) {
    const {username, password, name, phone, mail, dob, gender, state, 
        city, area, street} = req.body;
    
    if (req.path === "/register") {
        if (![username, password, name, phone, mail, dob, gender, state, 
            city, area, street].every(Boolean)) {
          return res.json("Missing Credentials");
        } 
    } else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
          return res.json("Missing Credentials");
        } 
    }
    next();
};
  
function validTokenTest (req, res, next) {
    const token = req.header("token");
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

router.post("/register", testMissing, async (req, res) => {
    const {username, password, name, phone, mail, dob, gender, state, 
            city, area, street} = req.body;
    console.log(name)
    try {   
        const user = await db.query(
            "SELECT * FROM users WHERE username = $1",[username]
        );
            
        if (user.rows.length > 0) {
            return res.status(401).json("User already exist!");
        }
        
        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(password, salt);

        let newLoc = await db.query("INSERT INTO location (state, city, area, street) VALUES ($1, $2, $3, $4) RETURNING *", [state, city, area, street]);
        let newUser = await db.query(
            "INSERT INTO users (username, password, name, phone, mail, dob, gender, location_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [username, bcryptPassword, name, phone, mail, dob, gender, newLoc.rows[0].location_id]
          );

        const jwtToken = jwtGenerator(newUser.rows[0].username);

        return res.json({ jwtToken });
    } catch (err) {
      console.log(err);
    }
});

router.post('/login', testMissing, async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await db.query(
            "SELECT * FROM users WHERE username = $1",[username]
        );
            
        if (user.rows.length === 0) {
            return res.status(401).json("User does not exist");
        }

        console.log(user);

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if (!validPassword) {
            return res.status(401).json("Invalid username or password");
        }

        const jwtToken = jwtGenerator(user.rows[0].username);
        return res.json({ jwtToken });

    } catch (err) {
        console.log(err);
    }
});

router.post("/verify", validTokenTest, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

module.exports = router;