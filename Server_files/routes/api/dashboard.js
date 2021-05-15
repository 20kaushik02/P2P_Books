const express = require("express");
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

router.post("/", tokenCheck, async (req, res) => {
  try {
    const user = await db.query("SELECT * FROM users WHERE username = $1", [req.user,]);
    res.json(user.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
