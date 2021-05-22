const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//accept an offer/make a transaction
router.post("/insert", tokenCheck, async (req,res) => {
    try {
        const {offer_id, return_date} = req.body;
        let date_ob = new Date();
        let curr_date = date_ob.toISOString().split('T')[0]
        const get_result = await db.query("INSERT INTO transactions(date_of_transac, return_date, offer_id)\
        values($1,$2,$3) RETURNING *", [curr_date, return_date, offer_id]);
        console.log(get_result.rows);
        res.status(201).json({
        status: "success",
        data: {
        transaction_details: get_result.rows[0],
       },
    });
    }catch (err){
      console.log(err);
    }
});

module.exports = router;