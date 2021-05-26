const express = require("express");
const router = express.Router();

const db = require("../../DB_files");

const tokenCheck = require("../../middleware/tokenCheck");

// Accept an offer/make a transaction

router.post("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { offer_id, return_date } = req.body;
    let date_ob = new Date();
    let curr_date = date_ob.toISOString().split("T")[0];
    const get_result = await db.query(
      "INSERT INTO transactions(date_of_transac, return_date, offer_id)\
        values($1,$2,$3) RETURNING *",
      [curr_date, return_date, offer_id]
    );
    const update_book_status = await db.query(
      "UPDATE books_active SET book_status = 'R' WHERE book_active_id IN\
        (SELECT book_active_id from books_active WHERE owner = $1 AND book_active_id IN\
          (SELECT ba.book_active_id FROM books_active ba INNER JOIN offers o ON o.book_active_id=ba.book_active_id\
            AND o.offer_id = $2))",
      [username, offer_id]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        transaction_details: get_result.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get user's  transactions

router.get("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const get_result = await db.query(
      "SELECT t.transaction_id, t.date_of_transac, t.return_date, o.renter FROM \
      transactions t INNER JOIN offers o ON t.offer_id = o.offer_id INNER JOIN books_active ba ON\
      ba.book_active_id = o.book_active_id AND ba.owner = $1",
      [username]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        transaction_details: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update return date
router.put("/", tokenCheck, async (req, res) => {
  try {
    const { transaction_id, return_date } = req.body;
    const get_result = await db.query(
      "UPDATE transactions SET return_date = $1 WHERE transaction_id = $2 RETURNING *",
      [return_date, transaction_id]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        new_transaction_details: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get transactions made with a particular user

router.get("/profile", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { renter } = req.query;
    const get_result = await db.query(
      "SELECT t.transaction_id, t.date_of_transac, t.return_date FROM transactions t\
    INNER JOIN offers o ON t.offer_id = o.offer_id AND o.renter = $1 INNER JOIN books_active ba ON\
    ba.book_active_id = o.book_active_id AND ba.owner = $2",
      [renter, username]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        transaction_details: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get transactions involving a particular book

router.get("/filter", tokenCheck, async (req, res) => {
  try {
    const { books_id } = req.query;
    const username = req.user;
    const get_result = await db.query(
      "SELECT t.transaction_id, t.date_of_transac, t.return_date FROM transactions t\
    INNER JOIN offers o ON t.offer_id = o.offer_id INNER JOIN books_active ba ON ba.book_active_id = o.book_active_id AND\
    ba.owner = $1 INNER JOIN books b ON b.books_id = ba.books_id AND b.books_id = $2",
      [username, books_id]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        transaction_details: get_result.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
