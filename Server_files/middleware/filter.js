const express = require("express");
const db = require("../../DB_files");
const tokenCheck = require("./tokenCheck");
require('dotenv').config();
const jwt = require("jsonwebtoken");

function filter_active_books(req, res, next){
    if(req.path == "/loc")
    {
        console.log("initiating get request for filtered active books...");
        const { search_title, search_author, search_category, search_state, search_city, search_area,
        search_street} = req.query;
    
        var search_method = 0;
        if (search_title) search_method = search_method + 1;
        if (search_author) search_method = search_method + 2;
        if (search_category && search_category != "all")
          search_method = search_method + 4;
            
          var get_result;
          switch (search_method) {
            case 0:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id)\
                WHERE ba.owner = $1",
                [user]
              );
              break;
            case 1:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.title) ~ LOWER($1)) WHERE ba.owner = $2",
                [search_title, user]
              );
              break;
            case 2:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.author) ~ LOWER($1)) WHERE ba.owner = $2",
                [search_author, user]
              );
              break;
            case 3:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2)) WHERE ba.owner = $3",
                [search_title, search_author, user]
              );
              break;
            case 4:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.category) = LOWER($1)) WHERE ba.owner = $2",
                [search_category, user]
              );
              break;
            case 5:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.category) = LOWER($2)) WHERE ba.owner = $3",
                [search_title, search_category, user]
              );
              break;
            case 6:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.author) ~ LOWER($1) AND LOWER(b.category) = LOWER($2)) WHERE ba.owner = $3",
                [search_author, search_category, user]
              );
              break;
            case 7:
              get_result = await db.query(
                "SELECT ba.book_active_id, b.* FROM books b INNER JOIN books_active ba ON (ba.books_id = b.books_id\
                AND LOWER(b.title) ~ LOWER($1) AND LOWER(b.author) ~ LOWER($2) AND LOWER(b.category) = LOWER($3))\
                WHERE ba.owner = $4",
                [search_title, search_author, search_category, user]
              );
              break;
            default:
              throw "Bad GET request parameters";
            }
        next();
    }
};
module.exports = filter_active_books;