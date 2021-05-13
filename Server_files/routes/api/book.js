const express = require('express');
const router = express.Router();
const db = require("../../DB_files");

//for inserting a book
router.post("/", async (req, res) => {
    try {
        const results = await db.query(
        "INSERT INTO books(title, author, category) VALUES ($1, $2, $3) RETURNING *",
        [req.body.title, req.body.author, req.body.category]
        );
        console.log(results.rows);
        res.status(201).json({
          status: "success",
          data: {
            Book: results.rows[0],
          },
        });
    } catch (err) {
      console.log(err);
    }
});

//get all books
router.get("/", async (req,res) => {
  try{
    console.log('initiating get request for all books...');
    const get_result = await db.query(
      "SELECT title, author, category FROM books");
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