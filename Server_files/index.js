require("dotenv").config();
const express = require("express");
const db = require("./DB_files");
const app = express();

app.use(express.json());

app.use('/api/book', require('./routes/api/book'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started - ${port}`);
});



