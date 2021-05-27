import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BooksContext } from "../context/BooksContext";

import Offers from "../apis/OffersAPI";

toast.configure();

const FilteredActiveBooksList = ({ user }) => {
  const { books, setBooks } = useContext(BooksContext);

  const handleMakeOffer = async (ba_id) => {
    try {
      console.log(ba_id);
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
        console.error(error.response);
        toast.warning(error.response.data.msg);
      });
      if(response) {
        console.log("Response" + response);
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

export default FilteredActiveBooksList;
