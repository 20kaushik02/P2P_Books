import React, { useState } from "react";
import Books from "../apis/BooksAPI";

const AddBook = ({ setAuth }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const response = await Books.post("/", {
        title,
        author,
        category,
      }, {
        headers: { token: localStorage.token }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
      <div className="mb-4">
      <form action="">
        <div class="row">
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
            <button
              onClick={handleAddBook}
              type="submit"
              className="btn btn-primary"
              >
              Add Book
            </button>
      </form>
    </div>
  );
};

export default AddBook;
