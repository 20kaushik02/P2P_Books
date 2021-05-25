const express = require('express');
const router = express.Router();
const db = require("../../DB_files");
const tokenCheck = require("../../middleware/tokenCheck");

router.get("/", tokenCheck, async (req, res) => {
    try {
        const username = req.user;
        const get_result = await db.query(
            "SELECT * FROM notification WHERE username=$1 ORDER BY notif_id DESC",
            [username]
        );
        console.log(get_result.rows);
        res.status(201).json({
            status: "success",
            data: {
            reqMessages: get_result.rows,
            },
        });
        } catch (err) {
        console.log(err);
    }
});

router.get("/notif-count", tokenCheck, async (req, res) => {
    try {
        const username = req.user;
        const get_result = await db.query(
            "SELECT COUNT(notif_id) FROM notification WHERE username=$1",
            [username]
        );
        console.log(get_result);
        res.status(201).json({
            status: "success",
            data: {
            Count: get_result.rows[0]["count"],
            },
        });
        } catch (err) {
        console.log(err);
    }
});

router.delete("/", tokenCheck, async (req, res) => {
    try {
      const { notif_id } = req.query;
      const get_result = await db.query(
        "DELETE FROM notification WHERE notif_id=$1 RETURNING *",
        [notif_id]
      );
      console.log(get_result.rows[0]);
      res.status(201).json({
        status: "success",
        data: {
          Deleted_notif: get_result.rows[0],
        },
      });
    } catch (err) {
      console.log(err);
    }
});

module.exports = router;