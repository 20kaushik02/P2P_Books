require("dotenv").config();
const express = require("express");
const db = require("./DB_files");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/book", require("./routes/api/book"));
app.use("/api/offers", require("./routes/api/offers"));
app.use("/api/books_active", require("./routes/api/books_active"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/dashboard", require("./routes/api/dashboard"));
app.use("/api/transactions", require("./routes/api/transactions"));
app.use("/api/requests", require("./routes/api/requests"));
app.use("/api/notifications", require("./routes/api/notifications"));

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server started - ${port}`);
});
