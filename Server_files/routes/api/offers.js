const express = require("express");
const router = express.Router();

const db = require("../../DB_files");

const tokenCheck = require("../../middleware/tokenCheck");

// Get offers made to the user(owner)

router.get("/profile/owner", tokenCheck, async (req, res) => {
  try {
    console.log(req.user);
    const username = req.user;
    console.log("initiating get request for all offers...");
    const get_result = await db.query(
      "SELECT b.title, o.renter, u.reputation, o.offer_id FROM offers o\
      INNER JOIN books_active ba ON ba.book_active_id = o.book_active_id AND ba.owner = $1\
      INNER JOIN books b ON ba.books_id = b.books_id\
      INNER JOIN users u ON u.username=o.renter\
      WHERE o.offer_id NOT IN (SELECT t.offer_id FROM transactions t)\
      ORDER BY b.title",
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

// Get offers made by the user(renter)

router.get("/profile/renter", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const get_result = await db.query(
      "SELECT b.title, ba.owner, o.offer_id from books b\
      INNER JOIN books_active ba ON b.books_id = ba.books_id\
      INNER JOIN offers o ON o.book_active_id = ba.book_active_id AND o.renter = $1\
      WHERE o.offer_id NOT IN (SELECT t.offer_id FROM transactions t)",
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

// Get offers for a particular book made to the user

router.get("/profile/getone", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { books_id } = req.query;
    const get_result = await db.query(
      "SELECT DISTINCT o.renter, o.offer_id from offers o INNER JOIN books_active ba ON \
    o.book_active_id = ba.book_active_id AND ba.books_id = $1 AND ba.owner = $2",
      [books_id, username]
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

// Make an offer

router.post("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const book_active_id = req.body.book_active_id;
    const check_dup = await db.query(
      "SELECT * FROM offers WHERE book_active_id = $1 AND renter = $2",
      [book_active_id, username]
    );
    if (check_dup.rows.length > 0) {
      return res.status(401).json("Offer already exists!");
    }

    const get_result = await db.query(
      "INSERT INTO offers(book_active_id,renter) values($1,$2) RETURNING *",
      [book_active_id, username]
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

// Remove offer made by user

router.delete("/", tokenCheck, async (req, res) => {
  try {
    const { offer_id } = req.query;
    const get_result = await db.query(
      "DELETE FROM offers WHERE offer_id = $1 RETURNING *",
      [offer_id]
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
