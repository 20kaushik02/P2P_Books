const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//accept an offer/make a transaction
router.post("/insert", tokenCheck, (req,res) => {
    try {
        const username = req.user;
        const get_result = await db.query("INSERT INTO transactions(date_o")  
    }catch (err){
      console.log(err);
    }
});