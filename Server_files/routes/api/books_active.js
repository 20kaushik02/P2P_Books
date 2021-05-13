const express = require('express');
const router = express.Router();
const db = require("../../DB_files");

//get all active books of the user
router.get("/:username", async (req,res) => {
  try{
    console.log(req.params);
    const username = req.params;
    console.log('initiating get request for all active books of user...');
    const get_result = await db.query(
      "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id AND ba.owner = $1",
      [username.username]);
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

//get all active books
router.get("/", async (req,res) => {
  try{
    console.log('initiating get request for all active books...');
    const get_result = await db.query(
      "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
    );
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
