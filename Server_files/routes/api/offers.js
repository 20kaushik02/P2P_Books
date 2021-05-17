const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");
const { route } = require("./book");

//get offers MADE TO the user/owner
router.get("/profile/owner/get", tokenCheck, async (req, res) => {
  try {
    console.log(req.user);
    const username = req.user;
    console.log("initiating get request for all offers...");
    const get_result = await db.query(
      "SELECT o.renter from offers o INNER JOIN books_active ba ON ba.book_active_id = o.book_active_id AND\
        ba.owner = $1", [username]);

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

//make an offer
router.post("/profile/insert", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { book_name, owner_name } = req.body;
    const get_books_id = await db.query(
      "SELECT books_id FROM books WHERE LOWER(title) = LOWER($1)",
      [book_name]
    );
    const get_book_active_id = await db.query(
      "SELECT ba.book_active_id from books_active ba INNER JOIN books b ON\
      ba.books_id = $1 AND LOWER(ba.owner) = LOWER($2)",
      [get_books_id.rows[0].books_id, owner_name]
    );
    const get_result = await db.query(
      "INSERT INTO offers(book_active_id,renter) values($1,$2) RETURNING *",
      [get_book_active_id.rows[0].book_active_id, username]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Offer: get_result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//get offers MADE BY the user/renter
router.get("/profile/renter/get", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const get_result = await db.query(
      "SELECT b.title,ba.owner from books b INNER JOIN books_active ba ON \
      b.books_id = ba.books_id INNER JOIN offers o ON o.book_active_id = ba.book_active_id AND o.renter = $1",
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

//get offers for a particular book MADE TO the user
router.get("/profile/getone", tokenCheck, async (req,res) => {
  try {
    const username = req.user;
    const {books_id} = req.query;
    const get_result = await db.query("SELECT DISTINCT o.renter from offers o INNER JOIN books_active ba ON \
    o.book_active_id = ba.book_active_id AND ba.books_id = $1 and ba.owner = $2",
    [books_id, username]);
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Offers: get_result.rows,
      },
    });
  }catch (err){
    console.log(err);
  }
});

//remove offer made by user
router.put("/profile/delete", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { book_name, owner_name } = req.body;
    const get_result = await db.query(
      "DELETE FROM offers where renter=$1 AND \
      book_active_id IN(SELECT ba.book_active_id FROM books_active ba INNER JOIN books b ON \
      ba.books_id = b.books_id AND ba.owner = $2 and b.title = $3) RETURNING *",
      [username, owner_name, book_name]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Deleted_Offers: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
