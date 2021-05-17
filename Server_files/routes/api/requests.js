const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

//requests made by an user
router.get("/myrequests", tokenCheck, async (req, res) => {
    try {
      const username = req.user;
      const get_result = await db.query(
        "SELECT b.* from books b INNER JOIN requests r ON \
        b.books_id = r.books_id AND r.requester = $1",
        [username]
      );
      console.log(get_result.rows);
      res.status(201).json({
        status: "success",
        data: {
          Offer: get_result.rows,
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
            Books: get_result.rows,
        },
        });
    } catch (error) {
        console.log(error);
    }
});

//get all requests
router.get("/all", tokenCheck, async (req,res) => {
    try{
      console.log(req.user);
      console.log('initiating get request for all requests...');
      const get_result = await db.query(
        "SELECT b.*, r.requester FROM books b INNER JOIN requests r ON b.books_id = r.books_id");
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