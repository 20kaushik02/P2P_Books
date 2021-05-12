const express = require('express');
const router = express.Router();
const db = require("../../DB_files");

router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query(
        "INSERT INTO books(title, author, category) values ($1, $2, $3) returning *",
        [req.body.title, req.body.author, req.body.category]
        );
        console.log(results);
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

module.exports = router;