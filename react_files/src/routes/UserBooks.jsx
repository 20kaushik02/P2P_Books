import React, { Fragment, useEffect, useState } from "react";

import Dashboard from "../apis/DashboardAPI";

import Header from "../components/Header";
import UserBooksList from "../components/UserBooksList";
import BorrowedBooksList from "../components/BorrowedBooksList";

const UserBooks = () => {
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
      <h2>{name}'s books</h2>
      <UserBooksList />
      <h2>{name}'s borrowed books</h2>
      <BorrowedBooksList />
    </Fragment>
  );
};

export default UserBooks;
