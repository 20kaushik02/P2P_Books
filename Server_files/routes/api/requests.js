const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//get all requests
router.get("/", tokenCheck, async (req,res) => {
  try{
    console.log(req.user);
    console.log('initiating get request for all requests...');
    const get_result = await db.query(
      "SELECT r.request_id, r.requester, b.* FROM books b INNER JOIN requests r ON b.books_id = r.books_id");
      console.log(get_result.rows);
      res.status(201).json({
        status: "success",
        data: {
          reqBooks: get_result.rows,
        },
      });
  } catch(err){
    console.log(err);
  }
});

//requests made by an user
router.get("/profile", tokenCheck, async (req, res) => {
    try {
      const username = req.user;
      const get_result = await db.query(
        "SELECT r.request_id, b.* from books b INNER JOIN requests r ON \
        b.books_id = r.books_id AND r.requester = $1",
        [username]
      );
      console.log(get_result.rows);
      res.status(201).json({
        status: "success",
        data: {
          reqBooks: get_result.rows,
        },
      });
    } catch (err) {
      console.log(err);
    }
});

//filter all requests
router.get("/filter", tokenCheck, async (req, res) => {
    try {
        console.log("initiating get request for filtered requests...");
        const { search_title, search_author, search_category } = req.query;
        console.log(search_title)
        var search_method = 0;
        if (search_title) search_method = search_method + 1;
        if (search_author) search_method = search_method + 2;
        if (search_category && search_category != "all")
        search_method = search_method + 4;

        var get_result;
        switch (search_method) {
        case 0:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id)"
            );
            break;
        case 1:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.title) ~ LOWER($1))",
            [search_title]
            );
            break;
        case 2:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.author) ~ LOWER($1))",
            [search_author]
            );
            break;
        case 3:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2))",
            [search_title, search_author]
            );
            break;
        case 4:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.category) = LOWER($1))",
            [search_category]
            );
            break;
        case 5:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.category) = LOWER($2))",
            [search_title, search_category]
            );
            break;
        case 6:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.author) ~ LOWER($1) AND LOWER(b.category) = LOWER($2))",
            [search_author, search_category]
            );
            break;
        case 7:
            get_result = await db.query(
            "SELECT r.request_id, b.* FROM books b INNER JOIN requests r ON (r.books_id = b.books_id\
            AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2) AND LOWER(b.category) = LOWER($3))",
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
            reqBooks: get_result.rows,
        },
        });
    } catch (error) {
        console.log(error);
    }
});

//make a request
router.post("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { books_id } = req.body;

    const request_check = await db.query(
      "SELECT * FROM requests WHERE books_id=$1 AND requester=$2", 
      [books_id, username]
    );

    if (request_check.rows.length > 0) {
      return res.json({
        status: "failure",
      });
    }

    const new_request = await db.query(
      "INSERT INTO requests (request_date, expiry_date, books_id, requester)\
      VALUES (CURRENT_DATE, CURRENT_DATE + INTERVAL '7 day', $1, $2) RETURNING *",
      [books_id, username]
    );

    console.log(new_request.rows[0]);
    res.status(201).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//delete a request
router.delete("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { books_id } = req.body;
    const get_result = await db.query(
      "DELETE FROM requests where books_id=$1 AND requester=$2 RETURNING *",
      [books_id, username]
    );
    console.log(get_result.rows[0]);
    res.status(201).json({
      status: "success",
      data: {
        Deleted_request: get_result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;