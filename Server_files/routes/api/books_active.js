const express = require('express');
const router = express.Router();
const db = require("../../DB_files");

//get all active books of the user
/*
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
*/
//get all active books
router.get("/all", async (req,res) => {
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

//filter books based on parameters
router.get("/", async (req, res) => {
  try {
    console.log("getting required books...");
    const { search_title, search_author, search_category } = req.body.params;

    var search_method = 0;
    if(search_title) search_method = search_method + 1;
    if(search_author)  search_method = search_method + 2; 
    if(search_category && search_category!="any")  search_method = search_method + 4;

    console.log(req.body.params);
    var get_result;
    switch (search_method)  {
      case 0:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id)"
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1);", [search_title]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.author ~ $1);", [search_author]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.author ~ $2);", [search_title, search_author]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.category ~ $1);", [search_category]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.category ~ $2);", [search_title, search_category]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.author ~ $1 AND b.category ~ $2);", [search_author, search_category]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT b.title, b.author, b.category FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.author ~ $2 AND b.category ~ $3);", [search_title, search_author, search_category]
        );
        break;
      default: 
        throw("Bad GET request parameters");
    }
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;