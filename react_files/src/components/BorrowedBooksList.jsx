import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";

import { OffersContext } from "../context/OffersContext";

import BooksActive from "../apis/BooksActiveAPI";

toast.configure();

const BorrowedBooksList = () => {
  const { offers, setOffers } = useContext(OffersContext);
  const cur_date = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    try {
      const response = await BooksActive.get("/profile/borrowed", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setOffers(response.data.data.Books);
    } catch (error) {
      console.error(error);
      toast.error("Could not load page properly, try again");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="list-group">
      <table className="table table-hover table-light">
        <thead>
          <tr className="bg-primary">
            <th scope="col">Owner</th>
            <th scope="col">Title</th>
            <th scope="col">Return date</th>
            <th scope="col">Contact details</th>
          </tr>
        </thead>
        <tbody>
          {offers &&
            offers.map((offer) => {
              return (
                <tr
                  className={
                    offer.return_date < cur_date ? "table-danger" : null
                  }
                  key={offer.book_active_id}
                >
                  <td>{offer.owner}</td>
                  <td>{offer.title}</td>
                  <td>{offer.return_date}</td>
                  <td>
                    <p>
                      Phone: {offer.phone}
                      <br />
                      Mail: {offer.mail}
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowedBooksList;
