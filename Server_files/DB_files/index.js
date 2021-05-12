/*
.env should contain the following:

PORT = your_port
PGHOST = 'localhost'
PGUSER = postgres
PGDATABASE = p2p_books
PGPASSWORD = your_password
PGPORT = 5432

*/

const { Pool } = require("pg");

const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};