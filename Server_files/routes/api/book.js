const express = require('express');
const router = express.Router();
const db = require("../../DB_files");

//for inserting a book
router.post("/insert", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query(
        "INSERT INTO books(title, author, category) values ($1, $2, $3) returning *",
        [req.body.title, req.body.author, req.body.category]
        );
        console.log(results);
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
router.get("/get", async (req,res) => {
  try{
    console.log('initiating get request for all books...');
    const get_result = await db.query(
      "SELECT title,author,category FROM books");
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