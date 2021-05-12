require("dotenv").config();
const express = require("express");
const db = require("./DB_files");
const app = express();

app.use(express.json());

app.use('/api/book', require('./routes/api/book'));
app.use('/api/offers', require('./routes/api/offers'));
app.use('/api/books_active', require('./routes/api/books_active'));
const port = process.env.PORT || 9000;
app.listen(port, () => {
    console.log(`Server started - ${port}`);
});



