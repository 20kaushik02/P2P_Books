import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BooksContext } from "../context/BooksContext";

import BooksActive from "../apis/BooksActiveAPI";
import Offers from "../apis/OffersAPI";

toast.configure();

const ActiveBooksList = ({ rep, user }) => {
  const { books, setBooks } = useContext(BooksContext);

  const fetchData = async () => {
    try {
      const response = await BooksActive.get("/", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setBooks(response.data.data.Books);
    } catch (error) {
      console.error(error);
      toast.error("Could not load page properly, try again");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleMakeOffer = async (ba_id) => {
    try {
      const response = await Offers.post(
        "/",
        {
          book_active_id: ba_id,
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
      if(response) {
        toast.success("Offer made!");
      }
    } catch (error) {
      toast.error("Could not make offer, try again");
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
            <th scope="col">Offer</th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => {
              return (
                <tr key={book.book_active_id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>
                    {book.owner !== user ? (
                      rep <= 0 ? (
                        <button className="btn btn-secondary" disabled>
                          Not enough reputation
                        </button>
                      ) : (
                        <Link to="#">
                          <button
                            onClick={() => {
                              handleMakeOffer(book.book_active_id);
                            }}
                            className="btn btn-lg btn-success"
                          >
                            Get this book!
                          </button>
                        </Link>
                      )
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        You own this book.
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveBooksList;
