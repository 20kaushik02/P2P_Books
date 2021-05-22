import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Books from "../apis/BooksAPI";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleAddBook = async () => {
    try {
      const response = await Books.post("/", {
        title,
        author,
        category,
      }, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      <div className="mb-4">
      <form action="">
        <div className="row">
          <div className="col">
            <p className="fs-4">Title of book:</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Title"
              />
          </div>
          <div className="col">
            <p className="fs-4">Author of book:</p>
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Author"
              />
          </div>
          <div className="col">
            <p className="fs-4">Category of book (only one):</p>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Category"
              />
          </div>
          </div>
          <br/>
          <Link to={{
            pathname:"/success",
            state: {
              msg: "The book has been added to the database."
            }
          }}>
            <button
              onClick={handleAddBook}
              className="btn btn-success"
              >
              Add Book
            </button>
          </Link>
        </form>
      </div>
    </Fragment>
  );
};

export default AddBook;
