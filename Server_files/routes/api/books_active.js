const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");
const book_active_filter = require("../../middleware/filter")
//get all active books
router.get("/", async (req, res) => {
  try {
    console.log("initiating get request for all active books...");
    const get_result = await db.query(
      "SELECT ba.book_active_id, ba.owner, b.* FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
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
    const user = req.user;
    const get_result = await db.query(
      "SELECT b.* FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id\
      AND ba.owner = $1",
      [user]
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
    const { search_title, search_author, search_category, search_state, search_city, search_area,
    search_street} = req.query;

    var search_method = 0;
    if (search_title) search_method = search_method + 1;
    if (search_author) search_method = search_method + 2;
    if (search_category && search_category != "all")
      search_method = search_method + 4;

    var get_result;
    switch (search_method) {
      case 0:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc"
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(title) ~ LOWER($1)",
          [search_title]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(author) ~ LOWER($1)",
          [search_author]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(title) ~ LOWER($1)\
          AND LOWER(author) ~ LOWER($2)",
          [search_title, search_author]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(category) ~ LOWER($1)",
          [search_category]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(title) ~ LOWER($1)\
          AND LOWER(category) = LOWER($2)",
          [search_title, search_category]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(author) ~ LOWER($1)\
          AND LOWER(category) = LOWER($2)",
          [search_author, search_category]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT book_active_id, owner, books_id, title, author, category FROM books_active_loc WHERE LOWER(title) ~ LOWER($1)\
          AND LOWER(author) ~ LOWER($2) AND LOWER(category) = LOWER($3)",
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
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id)\
          WHERE ba.owner = $1",
          [user]
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.title) ~ LOWER($1)) WHERE ba.owner = $2",
          [search_title, user]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.author) ~ LOWER($1)) WHERE ba.owner = $2",
          [search_author, user]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2)) WHERE ba.owner = $3",
          [search_title, search_author, user]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.category) = LOWER($1)) WHERE ba.owner = $2",
          [search_category, user]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.category) = LOWER($2)) WHERE ba.owner = $3",
          [search_title, search_category, user]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.author) ~ LOWER($1) AND LOWER(b.category) = LOWER($2)) WHERE ba.owner = $3",
          [search_author, search_category, user]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
          AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2) AND LOWER(b.category) = LOWER($3))\
          WHERE ba.owner = $4",
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
    res.status(400).json({
      status: "bad request",
    });
  }
});

router.get("/sorting", async (req, res) => {
  try {
    const get_category = await db.query(
      "SELECT DISTINCT b.category FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
    );
    const get_state = await db.query(
      "SELECT DISTINCT l.state FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );
    const get_city = await db.query(
      "SELECT DISTINCT l.city FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );
    const get_area = await db.query(
      "SELECT DISTINCT l.area FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );
    const get_street = await db.query(
      "SELECT DISTINCT l.street FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );

    res.status(201).json({
      status: "success",
      data: {
        Categories: get_category.rows,
        States: get_state.rows,
        Cities: get_city.rows,
        Areas: get_area.rows,
        Streets: get_street.rows
      },
    });
  } catch(err) {
    res.status(400).json({
      status: "bad request",
    });
  }
});

//filter active books based on location
router.get("/loc", tokenCheck, book_active_filter, (req,res) => {
  try {
    const {location} = req.query;
    
  } catch(error){
    console.log(error);
  }
});

//insert a particular user's active book
router.post("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { books_id } = req.body;

    const new_active_book = await db.query(
      "INSERT INTO books_active (book_status, books_id, owner)\
      VALUES ('A',$1,$2) RETURNING *",
      [books_id, username]
    );

    console.log(new_active_book.rows[0]);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//change user's active book status to unavailable
router.put("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { book_active_id } = req.body;

    const unav_book = await db.query(
      "UPDATE books_active SET book_status = 'N' WHERE\
      book_active_id = $1 AND owner = $2",
      [book_active_id, username]
    );
    console.log(unav_book.rows[0]);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
