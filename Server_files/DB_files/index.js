/*
.env should contain the following:

PORT = 9001
PGHOST = 'localhost'
PGPORT = 5432
PGUSER = your postgres username
PGPASSWORD = your postgres password
PGDATABASE = p2p_books
jwtSecret = 'this is a secret phrase for JWT token encryption'
*/

const { Pool, types } = require("pg");

// Parse dates in database as a string

types.setTypeParser(1082, function (stringValue) {
  return stringValue;
});

//Connect to the database

const pool = new Pool();
module.exports = {
  query: (text, params) => pool.query(text, params),
};
