const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//accept an offer/make a transaction
router.post("/insert", tokenCheck, (req,res) => {
    try {
        
    }catch (err){
    console.log(err);
    }
});