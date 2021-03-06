const express = require("express");
const router = express.Router();

const db = require("../../DB_files");

const tokenCheck = require("../../middleware/tokenCheck");

// Get user's profile and location details

router.get("/", tokenCheck, async (req, res) => {
  try {
    const user = await db.query(
      "SELECT u.*, l.* FROM users u INNER JOIN location l ON u.location_id = l.location_id\
      AND username = $1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
