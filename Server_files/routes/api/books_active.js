const express = require("express");
const router = express.Router();

const db = require("../../DB_files");

const tokenCheck = require("../../middleware/tokenCheck");

// Get all active books

router.get("/", async (req, res) => {
  try {
    console.log("initiating get request for all active books...");
    const get_result = await db.query(
      "SELECT ba.book_active_id, ba.owner, b.* FROM books b\
      INNER JOIN books_active ba ON ba.books_id = b.books_id AND ba.book_status='A'"
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Get user's active books

router.get("/profile", tokenCheck, async (req, res) => {
  try {
    console.log("initiating get request for user's active books...");
    const user = req.user;
    const get_result = await db.query(
      "SELECT t.transaction_id, t.return_date, ba.book_active_id, ba.book_status, o.renter, b.* FROM books b\
      INNER JOIN books_active ba ON ba.books_id = b.books_id AND ba.owner = $1\
      LEFT JOIN offers o ON o.book_active_id = ba.book_active_id\
      LEFT JOIN transactions t ON t.offer_id = o.offer_id",
      [user]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Get books borrowed by the user

router.get("/profile/borrowed", tokenCheck, async (req, res) => {
  try {
    console.log("initiating request for user's borrowed books...");
    const user = req.user;
    const get_result = await db.query(
      "SELECT t.return_date, ba.book_active_id, ba.owner, b.title, u.name, u.phone, u.mail FROM books b\
      INNER JOIN books_active ba ON ba.books_id = b.books_id AND ba.book_status='R'\
      INNER JOIN offers o ON o.book_active_id = ba.book_active_id AND o.renter = $1\
      INNER JOIN users u ON u.username = ba.owner\
      INNER JOIN transactions t ON t.offer_id = o.offer_id",
      [user]
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Filter all active books based on parameters
router.get("/filter", async (req, res) => {
  try {
    console.log("initiating get request for filtered active books...");
    const {
      search_title,
      search_author,
      search_category,
      search_state,
      search_city,
      search_area,
      search_street,
    } = req.query;

    var search_method = 0;
    if (search_title) search_method = search_method + 1;
    if (search_author) search_method = search_method + 2;
    if (search_category && search_category != "all")
      search_method = search_method + 4;

    var get_result;
    switch (search_method) {
      case 0:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE book_status='A'"
        );
        break;
      case 1:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(title) ~ LOWER($1) AND book_status='A'",
          [search_title]
        );
        break;
      case 2:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(author) ~ LOWER($1) AND book_status='A'",
          [search_author]
        );
        break;
      case 3:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(title) ~ LOWER($1) AND LOWER(author) ~ LOWER($2) AND book_status='A'",
          [search_title, search_author]
        );
        break;
      case 4:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(category) ~ LOWER($1) AND book_status='A'",
          [search_category]
        );
        break;
      case 5:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(title) ~ LOWER($1) AND LOWER(category) = LOWER($2) AND book_status='A'",
          [search_title, search_category]
        );
        break;
      case 6:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(author) ~ LOWER($1) AND LOWER(category) = LOWER($2) AND book_status='A'",
          [search_author, search_category]
        );
        break;
      case 7:
        get_result = await db.query(
          "SELECT ba.*, b.title, b.author, b.category, u.location_id, l.state, l.city, l.area, l.street FROM books_active ba\
          INNER JOIN books b ON ba.books_id = b.books_id\
          INNER JOIN users u on u.username = ba.owner\
          INNER JOIN location l ON l.location_id = u.location_id\
          WHERE LOWER(title) ~ LOWER($1) AND LOWER(author) ~ LOWER($2) AND LOWER(category) = LOWER($3) AND book_status='A'",
          [search_title, search_author, search_category]
        );
        break;
      default:
        throw "Bad GET request parameters";
    }
    var result_obj = { data: get_result.rows };
    var filtered_res = result_obj.data.filter(function (book) {
      return (
        (search_state === "all" ? true : book.state == search_state) &&
        (search_city === "all" ? true : book.city == search_city) &&
        (search_area === "all" ? true : book.area == search_area) &&
        (search_street === "all" ? true : book.street == search_street)
      );
    });
    console.log(filtered_res);
    res.status(201).json({
      status: "success",
      data: {
        Books: filtered_res,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Filter user's active books based on parameters

router.get("/profile/filter", tokenCheck, async (req, res) => {
  try {
    console.log("initiating get request for filtered user's active books...");
    const { search_title, search_author, search_category } = req.query;
    const { user } = req;
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
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Books: get_result.rows,
      },
    });
  } catch (error) {
    console.error(error);
  }
});

// Get all active book categories
router.get("/category", async (req, res) => {
  try {
    console.log("initiating get request for all active book categories...");
    const get_result = await db.query(
      "SELECT DISTINCT b.category FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
    );
    console.log(get_result.rows);
    res.status(201).json({
      status: "success",
      data: {
        Categories: get_result.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "bad request",
    });
  }
});

// Get locations and categories of active books

router.get("/sorting", async (req, res) => {
  try {
    const get_category = await db.query(
      "SELECT DISTINCT b.category FROM books b INNER JOIN books_active ba ON ba.books_id = b.books_id"
    );
    const get_state = await db.query(
      "SELECT DISTINCT l.state FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );
    const get_city = await db.query(
      "SELECT DISTINCT l.city FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );
    const get_area = await db.query(
      "SELECT DISTINCT l.area FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );
    const get_street = await db.query(
      "SELECT DISTINCT l.street FROM location l INNER JOIN users u ON u.location_id=l.location_id\
       INNER JOIN books_active ba ON ba.owner = u.username"
    );

    (get_state.rows.findIndex(x => x.state=="Tamil Nadu")) == -1 ? get_state.rows.push({ state : "Tamil Nadu"}) : console.log("State exists");
    (get_city.rows.findIndex(x => x.city=="Chennai")) == -1 ? get_city.rows.push({ city : "Chennai"}) : console.log("City exists");  
    (get_area.rows.findIndex(x => x.area=="Guindy")) == -1 ? get_area.rows.push({ area : "Guindy"}) : console.log("Area exists"); 
    (get_street.rows.findIndex(x => x.street=="Anna University, Sardar Patel Road")) == -1 ? 
      get_street.rows.push({ street : "Anna University, Sardar Patel Road"}) : console.log("Street exists"); 

    console.log(get_state.rows);
    console.log(get_city.rows);
    console.log(get_street.rows);
    console.log(get_area.rows);
    res.status(201).json({
      status: "success",
      data: {
        Categories: get_category.rows,
        States: get_state.rows,
        Cities: get_city.rows,
        Areas: get_area.rows,
        Streets: get_street.rows,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "bad request",
    });
  }
});

// Put book into circulation
router.post("/", tokenCheck, async (req, res) => {
  try {
    const username = req.user;
    const { books_id } = req.body;

    const new_active_book = await db.query(
      "INSERT INTO books_active (book_status, books_id, owner)\
      VALUES ('A',$1,$2) RETURNING *",
      [books_id, username]
    );

    console.log(new_active_book.rows[0]);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
  }
});

// Change user's active book's status
router.put("/", tokenCheck, async (req, res) => {
  try {
    const { book_active_id, new_status } = req.body;
    console.log(req.body);
    const unav_book = await db.query(
      "UPDATE books_active SET book_status = $1 WHERE book_active_id = $2",
      [new_status, book_active_id]
    );
    console.log(unav_book.rows[0]);
    res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
