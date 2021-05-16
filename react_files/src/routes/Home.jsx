import React, { Fragment, useEffect, useState } from "react";
import SearchBox from "../components/SearchBox";
import AllActiveBooksList from "../components/AllActiveBooksList";
import Header from "../components/Header";
import DashboardAPI from "../apis/DashboardAPI";

const Home = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    try {
      const res = await DashboardAPI.post("/", {}, {
          headers: { token: localStorage.token }
        });

      console.log("Dashboard response:" + res);
      if(res)
        setName(res.data.name);
      else
        setName("to P2P Books")
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
      <h2>Welcome {name}!</h2>
      <SearchBox />
      <AllActiveBooksList />
    </Fragment>
  );
};

export default Home;
