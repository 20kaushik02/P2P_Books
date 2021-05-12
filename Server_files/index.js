require("dotenv").config();
const express = require("express");
const db = require("./DB_files");
const app = express();

app.use(express.json());

app.post("/book", async (req, res) => {
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

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started - ${port}`);
});



