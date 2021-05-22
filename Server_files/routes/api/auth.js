require("dotenv").config();
const express = require('express');
const router = express.Router();
const db = require("../../DB_files");
const bcrypt = require("bcrypt");

const jwtGenerator = require("../../jwtGenerator");
const credCheck = require('../../middleware/missingCred');
const tokenCheck = require('../../middleware/tokenCheck');

router.post("/register", credCheck, async (req, res) => {
    const {username, password, name, phone, mail, dob, gender, state, 
            city, area, street} = req.body;
    console.log(name);
    try {   
        const user = await db.query(
            "SELECT * FROM users WHERE username = $1\
            UNION SELECT * FROM users WHERE mail = $2",[username, mail]
        );
            
        if (user.rows.length > 0) {
            return res.status(401).json("User already exists!");
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

router.post('/login', credCheck, async (req, res) => {
    const {username, password} = req.body;
    try {
        var user = await db.query("SELECT * FROM users WHERE username = $1",[username]);
        
        if(user.rows.length === 0)
            user = await db.query("SELECT * FROM users WHERE mail = $1", [username]);

        if(user.rows.length === 0)
            return res.status(401).json("User does not exist");
        
        console.log(username);
        
        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        
        if (!validPassword) {
            return res.status(401).json("Invalid username or password");
        }

        const jwtToken = jwtGenerator(user.rows[0].username);
        return res.json({ jwtToken });

    } catch (err) {
        console.log(err);
    }
});

router.put("/", tokenCheck, async (req, res) => {
    try {
      const username = req.user;
      const {name, phone, mail, state, city, area, street} = req.body;
  
      let updatedLoc = await db.query(
        "UPDATE location SET state=$1, city=$2, area=$3, street=$4 WHERE\
         location_id = (SELECT location_id FROM users WHERE username=$5)", [state, city, area, street, username]);
      
      let updatedUser = await db.query(
        "UPDATE users SET name=$1, phone=$2, mail=$3 WHERE username = $4",
        [name, phone, mail, username]);

      res.status(201).json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
    }
});

router.post("/verify", tokenCheck, (req, res) => {
    try {
      res.json(true);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  });

module.exports = router;