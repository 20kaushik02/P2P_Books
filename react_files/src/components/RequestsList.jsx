import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BooksContext } from "../context/BooksContext";

import BooksActive from "../apis/BooksActiveAPI";

toast.configure();

const RequestsList = () => {
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
      toast.success("Book is now in circulation!");
    } catch (error) {
      toast.error("Could not put up book for circulation, try again");
      console.error(error);
    }
  };
  return (
    <div className="list-group">
      <table className="table table-hover table-light">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => {
              return (
                <tr key={book.request_id}>
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
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsList;
