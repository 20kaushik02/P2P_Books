import React, { Fragment, useEffect, useState } from 'react'
import DashboardAPI from '../apis/DashboardAPI';
import Header from '../components/Header';
import UserOffersList from '../components/UserOffersList';

const UserOffers = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await DashboardAPI.post("/", {}, {
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
        </Fragment>
    )
}

export default UserOffers
