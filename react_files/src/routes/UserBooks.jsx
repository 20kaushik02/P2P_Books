import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import DashboardAPI from "../apis/DashboardAPI";
import UserBooksList from "../components/UserBooksList";

const UserBooks = () => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await DashboardAPI.post("/", {}, {
          headers: { token: localStorage.token }
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
      <h2>{name}'s books</h2>
      <UserBooksList/>
    </Fragment>
  );
};

export default UserBooks;
