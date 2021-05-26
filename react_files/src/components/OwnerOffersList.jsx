import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { OffersContext } from "../context/OffersContext";

import Offers from "../apis/OffersAPI";
import Transactions from "../apis/TransactionsAPI";

toast.configure();

const OwnerOffersList = () => {
  const { offers, setOffers } = useContext(OffersContext);
  
  var min_ret_date = new Date();
  min_ret_date.setDate(min_ret_date.getDate() + 7);

  const [rdate, setRdate] = useState(min_ret_date.toISOString().split("T")[0]);
  const [offerId, setOfferId] = useState();
  const [clicks, setClicks] = useState(false);

  const handleSelectOffer = (e, offer_id) => {
    try {
      e.preventDefault();
      setOfferId(offer_id);
      setClicks(true);
    } catch (error) {
      toast.warning("Something went wrong...");
      console.error(error);
    }
  };

  const handleAcceptOffer = async () => {
    try {
      const response = await Transactions.post(
        "/",
        {
          offer_id: offerId,
          return_date: rdate,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      console.log(response.status);
      if (response.status == 201)
        toast.success("Offer accepted!");
      else if (response.status == 400)
        toast.warning("Offer does not exist");
      fetchData();
      } catch (error) {
      toast.error("Could not accept offer, try again");
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await Offers.get("/profile/owner", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setOffers(response.data.data.Offer);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    {offers && offers.map((book_offers) => (
    <div className="list-group">
        <hr />
        <h3>Offers for {book_offers.title}</h3>
        <table className="table table-hover table-light">
        <thead>
            <tr className="bg-primary">
                <th scope="col">Requester</th>
                <th scope="col">Requester's reputation</th>
                <th scope="col"></th>
                {clicks ? (<th scope="col">Set Return Date</th>) : <th></th>}
            </tr>
        </thead>
        <tbody>
        {book_offers.offers && book_offers.offers.map((offer) => (
          <tr key={offer.offer_id}>
              <td>{offer.renter}</td>
              <td>{offer.reputation}</td>
              <td>
                  {(clicks && (offer.offer_id === offerId)) ?
                      (<Link to='#'>
                          <button onClick={()=> handleAcceptOffer()} 
                          className="btn btn-lg btn-success">Accept Offer?</button>
                      </Link>) :
                      (<button onClick={(e)=> handleSelectOffer(e, offer.offer_id)} 
                      className="btn btn-warning">Set Return Date</button>)}
              </td>
              <td>
                  {(clicks && (offer.offer_id === offerId)) ? 
                      (<input type="date" name="ret_date" min={min_ret_date.toISOString().split('T')[0]}
                      value={rdate} onChange={(e)=>setRdate(e.target.value)} 
                      className="form-control"/>) : (null)}
              </td>
            </tr>
        ))}
        </tbody>
        </table>
    </div>
    ))}
    <hr />
</div>  
  );
};

export default OwnerOffersList;
