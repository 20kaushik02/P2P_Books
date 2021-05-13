const express = require('express');
const router = express.Router();
const db = require('../../DB_files');

//get user offers
router.get("/get/:username", async (req,res) => {
    try{
        console.log(req.params.username);
        const username = req.params.username;
      console.log('initiating get request for all offers...');
      const get_result = await db.query(
        "SELECT o.renter from offers o INNER JOIN books_active ba ON ba.book_active_id = o.book_active_id AND ba.owner = $1",
        [username]);
        console.log(get_result.rows);
        res.status(201).json({
          status: "success",
          data: {
            Books: get_result.rows,
          },
        });
    } catch(err){
      console.log(err);
    }
  });
module.exports = router;