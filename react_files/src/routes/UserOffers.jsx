import React, { Fragment, useEffect, useState } from 'react'
import Dashboard from '../apis/DashboardAPI';
import Header from '../components/Header';
import OwnerOffersList from '../components/OwnerOffersList';
import UserOffersList from '../components/UserOffersList';

const UserOffers = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await Dashboard.get("/", {
        headers: {
            token: localStorage.getItem("token")
        }
      });

      const parseData = res.data;
      setName(parseData.name);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);
    
  return (
    <Fragment>
      <Header />
      <h2>{name}'s offers</h2>
      <UserOffersList />
      <h2>Offers made to {name}</h2>
      <OwnerOffersList/>
    </Fragment>
  )
}

export default UserOffers
