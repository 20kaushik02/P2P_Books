const express = require('express');
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//for inserting a book
router.post("/", tokenCheck, async (req, res) => {
    try {
        console.log(req.user);
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
router.get("/", tokenCheck, async (req,res) => {
  try{
    console.log(req.user);
    console.log('initiating get request for all books...');
    const get_result = await db.query(
      "SELECT * FROM books");
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

//filter all books based on parameters
router.get("/filter", tokenCheck, async (req, res) => {
  try {
    console.log("initiating get request for filtered active books...");
    const { search_title, search_author, search_category } = req.query;

    var search_method = 0;
    if (search_title) search_method = search_method + 1;
    if (search_author) search_method = search_method + 2;
    if (search_category && search_category != "all")
      search_method = search_method + 4;

    var get_result;
    switch (search_method) {
      case 0:
        get_result = await db.query(
          "SELECT b.* FROM books b"
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.title) ~ LOWER($1))",
          [search_title]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.author) ~ LOWER($1))",
          [search_author]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2))",
          [search_title, search_author]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.category) = LOWER($1))",
          [search_category]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.category) = LOWER($2))",
          [search_title, search_category]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.author) ~ LOWER($1) AND LOWER(b.category) = LOWER($2))",
          [search_author, search_category]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT b.* FROM books b AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2) AND LOWER(b.category) = LOWER($3))",
          [search_title, search_author, search_category]
        );
        break;
      default:
        throw "Bad GET request parameters";
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