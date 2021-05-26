/*
.env should contain the following:

PORT = your_port
PGHOST = 'localhost'
PGUSER = postgres
PGDATABASE = p2p_books
PGPASSWORD = your_password
PGPORT = 5432

*/

const { Pool, types } = require("pg");

types.setTypeParser(1082, function(stringValue) {
  return stringValue; 
});

const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};