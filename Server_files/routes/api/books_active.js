const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//get all active books
router.get("/all", async (req, res) => {
  try {
    console.log("initiating get request for all active books...");
    const get_result = await db.query(
      "SELECT b.* FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//get all active books of the user
router.get("/profile", tokenCheck, async (req, res) => {
  try {
    console.log("initiating get request for user's active books...");
    const username = req.user;
    const get_result = await db.query(
      "SELECT b.* FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id\
      AND ba.owner = $1",
      [username]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//filter all active books based on parameters
router.get("/filter", async (req, res) => {
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
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id)"
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1)",
          [search_title]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.author ~ $1)",
          [search_author]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.author ~ $2)",
          [search_title, search_author]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.category = $1)",
          [search_category]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.category = $2)",
          [search_title, search_category]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.author ~ $1 AND b.category = $2)",
          [search_author, search_category]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.author ~ $2 AND b.category = $3)",
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

//filter user's active books based on parameters
router.get("/profile/filter", tokenCheck, async (req, res) => {
  try {
    console.log("initiating get request for filtered user's active books...");
    const { search_title, search_author, search_category } = req.query;
    const { user } = req;
    var search_method = 0;
    if (search_title) search_method = search_method + 1;
    if (search_author) search_method = search_method + 2;
    if (search_category && search_category != "all")
      search_method = search_method + 4;

    var get_result;
    switch (search_method) {
      case 0:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id)\
          WHERE ba.owner = $1",
          [user]
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1) WHERE ba.owner = $2",
          [search_title, user]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.author ~ $1) WHERE ba.owner = $2",
          [search_author, user]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.author ~ $2) WHERE ba.owner = $3",
          [search_title, search_author, user]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.category = $1) WHERE ba.owner = $2",
          [search_category, user]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.category = $2) WHERE ba.owner = $3",
          [search_title, search_category, user]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.author ~ $1 AND b.category = $2) WHERE ba.owner = $3",
          [search_author, search_category, user]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND b.title ~ $1 AND b.author ~ $2 AND b.category = $3) WHERE ba.owner = $4",
          [search_title, search_author, search_category, user]
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

//get all active book categories
router.get("/category", async (req, res) => {
  try {
    console.log("initiating get request for all active book categories...");
    const get_result = await db.query(
      "SELECT DISTINCT b.category FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Categories: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
