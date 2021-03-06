import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Books from "../apis/BooksAPI";

toast.configure();

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [disable, setDisable] = useState(true);

  const checkInput = () => {
    setDisable(!((title !== "") && (author !== "") && (category !== "")));
  };
  
  useEffect(() => {
    checkInput();
  });

  const handleAddBook = async () => {
    try {
      const response = await Books.post(
        "/",
        {
          title,
          author,
          category,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      ).catch(error => {
        toast.warning(error.response.data.msg);
        console.error(error.response);
      });
      if (response && response.data.status === "success")
        toast.success("Added book successfully!");
    } catch (error) {
      toast.error("Could not add book, try again");
      console.error(error);
    }
  };
  
  return (
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
        <br />
        <Link to="#">
          <button disabled={disable} onClick={handleAddBook} className="btn btn-success">
            Add Book
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddBook;
