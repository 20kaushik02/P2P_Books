import React, { Fragment, useEffect, useState } from "react";
import AllActiveBooksList from "../components/AllActiveBooksList";
import Header from "../components/Header";
import DashboardAPI from "../apis/DashboardAPI";
import SearchActiveBooks from "../components/SearchActiveBooks";

const Home = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(""); 
  const getProfile = async () => {
    try {
      const res = await DashboardAPI.post("/", {}, {
        headers: {
          token: localStorage.getItem("token")
        }
      });

      console.log("Dashboard");
      if(res) {
        setUser(res.data.username)
        setName(res.data.name);
      }
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
      <SearchActiveBooks />
      <AllActiveBooksList user={user}/>
    </Fragment>
  );
};

export default Home;
