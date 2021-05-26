import React, { Fragment, useEffect, useState } from "react";

import Dashboard from "../apis/DashboardAPI";

import Header from "../components/Header";
import UserRequestsList from "../components/UserRequestsList";

const UserRequests = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await Dashboard.get("/", {
        headers: {
          token: localStorage.getItem("token"),
        },
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
      <h2>{name}'s requests</h2>
      <UserRequestsList />
    </Fragment>
  );
};

export default UserRequests;
