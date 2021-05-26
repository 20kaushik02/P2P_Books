import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { BooksContext } from "../context/BooksContext";

import Offers from "../apis/OffersAPI";

toast.configure();

const UserOffersList = () => {
  const { books, setBooks } = useContext(BooksContext);

  const handleRemoveOffer = async (offer_id) => {
    try {
      console.log(offer_id);
      const response = await Offers.delete("/", {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          offer_id,
        },
      });
      console.log(response);
      setBooks(books.filter((offer) => offer.offer_id !== offer_id));
      toast.success("Offer removed");
    } catch (error) {
      toast.error("Could not remove offer, try again");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Offers.get("/profile/renter", {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setBooks(response.data.data.Offer);
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
            <th scope="col">Owner</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {books &&
            books.map((book) => {
              return (
                <tr key={book.offer_id}>
                  <td>{book.owner}</td>
                  <td>{book.title}</td>
                  <td>
                    <Link to="#">
                      <button
                        onClick={() => handleRemoveOffer(book.offer_id)}
                        className="btn btn-danger"
                      >
                        Remove offer
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

export default UserOffersList;
