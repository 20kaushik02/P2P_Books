import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BooksContext } from "../context/BooksContext";

import Requests from "../apis/RequestsAPI";

toast.configure();

const UserRequestsList = () => {
  const { books, setBooks } = useContext(BooksContext);

  var cur_date = new Date();
  console.log(cur_date.toISOString().split('T')[0]);

  const handleRemoveRequest = async (request_id) => {
    try {
      console.log(request_id);
      const response = await Requests.delete("/", {
        params: {
          request_id,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setBooks(books.filter((request) => request.request_id !== request_id));
      console.log(response);
      toast.success("Removed request!");
    } catch (error) {
      toast.error("Could not remove request, try again");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Requests.get("/profile", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setBooks(response.data.data.reqBooks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="list-group">
      <table className="table table-hover table-light">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Category</th>
            <th scope="col">Expiry Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => {
              return (
                  <tr key={book.request_id}
                  className={(book.expiry_date === cur_date.toISOString().split('T')[0]) ? "table-danger" : null}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.expiry_date}</td>
                  <td>
                    <Link to="#">
                      <button
                        onClick={() => handleRemoveRequest(book.request_id)}
                        className="btn btn-warning"
                      >
                        Remove request
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

export default UserRequestsList;
