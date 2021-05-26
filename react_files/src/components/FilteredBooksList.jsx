import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BooksContext } from "../context/BooksContext";

import BooksActive from "../apis/BooksActiveAPI";
import Requests from "../apis/RequestsAPI";

toast.configure();

const FilteredBooksList = () => {
  const { books, setBooks } = useContext(BooksContext);

  const handleNewActiveBook = async (books_id) => {
    try {
      const response = await BooksActive.post(
        "/",
        {
          books_id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("added book to books_active:");
      console.log(response);
      toast.success("Book is in circulation!");
    } catch (error) {
      toast.error("Could not put up book for circulation, try again");
      console.error(error);
    }
  };
  
  const handleNewRequest = async (books_id) => {
    try {
      const req_response = await Requests.post(
        "/",
        {
          books_id,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log("request made:");
      console.log(req_response);
      toast.success("Request made for book!");
    } catch (error) {
      toast.error("Could not make request, try again");
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Link to="/newbook">
        <button className="btn btn-warning">
          Can't find the book you're looking for?
        </button>
      </Link>
      <br />
      <br />
      <div className="list-group">
        <table className="table table-hover table-light">
          <thead>
            <tr className="bg-primary">
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {books &&
              books.map((book) => {
                return (
                  <tr key={book.books_id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>
                      <Link to="#">
                        <button
                          onClick={() => {
                            handleNewActiveBook(book.books_id);
                          }}
                          className="btn btn-success"
                        >
                          Share this book!
                        </button>
                      </Link>
                    </td>
                    <td>
                      <Link to="#">
                        <button
                          onClick={() => {
                            handleNewRequest(book.books_id);
                          }}
                          className="btn btn-primary"
                        >
                          Want this book?
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default FilteredBooksList;
