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
      ORDER BY b.title", [username]);
    
    const bookwise_res = get_result.rows.reduce((acc, d) => {
      const found = acc.find(a => a.title === d.title);
      const offer = { offer_id: d.offer_id, renter: d.renter, reputation: d.reputation };
      if (!found) {
        acc.push({title:d.title, offers: [offer]})
      }
      else {
        found.offers.push(offer)
      }
      return acc;
    }, []);
    console.log(bookwise_res);
      
    res.status(201).json({
      status: "success",
      data: {
        Offer: bookwise_res,
      },
    });
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
  }
});

// Make an offer

router.post("/", tokenCheck, async (req, res) => {
  await db.query("BEGIN");

  try {
    const username = req.user;
    const book_active_id = req.body.book_active_id;
    const check_dup = await db.query(
      "SELECT * FROM offers WHERE book_active_id = $1 AND renter = $2\
      AND offer_id NOT IN (SELECT offer_id FROM transactions)",
      [book_active_id, username]
    );
    if (check_dup.rows.length > 0) {
      return res.status(400).json({
        status: "failure",
        msg: "You have already made this offer..."
      })
    }

    const get_result = await db.query(
      "INSERT INTO offers(book_active_id,renter) values($1,$2) RETURNING *",
      [book_active_id, username]
    );
    console.log(get_result.rows);

    await db.query("COMMIT");

    res.status(201).json({
      status: "success",
      data: {
        Offer: get_result.rows[0],
      },
    });
  } catch (error) {
    console.error(error);
    await db.query("ROLLBACK");
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
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
