const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//accept an offer/make a transaction
router.post("/", tokenCheck, async (req,res) => {
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

//get user transactions
router.get("/", tokenCheck, async (req,res) => {
  try {
      const username = req.user;
      const get_result = await db.query("SELECT t.transaction_id, t.date_of_transac, t.return_date, o.renter FROM \
      transactions t INNER JOIN offers o ON t.offer_id = o.offer_id INNER JOIN books_active ba ON\
      ba.book_active_id = o.book_active_id AND ba.owner = $1", [username]);
      console.log(get_result.rows);
      res.status(201).json({
      status: "success",
      data:{
        transaction_details: get_result.rows,
       },
    });
  }catch(err){
    console.log(err);
  }
});

//update transaction(i.e. return date of transaction)
router.put("/", tokenCheck, async (req,res) => {
try {
    const {transaction_id, return_date} = req.body;
    const get_result = await db.query("UPDATE transactions SET return_date = $1 WHERE transaction_id = $2 RETURNING *",
    [return_date, transaction_id]);
    console.log(get_result.rows);
      res.status(201).json({
      status: "success",
      data:{
        new_transaction_details: get_result.rows,
       },
    });
} catch(err){
  console.log(err);
}
});
module.exports = router;