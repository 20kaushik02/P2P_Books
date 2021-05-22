import React, { Fragment, useEffect, useState } from "react";
import Dashboard from "../apis/DashboardAPI";
import Header from "../components/Header";
import SearchActiveBooks from "../components/SearchActiveBooks";
import AllActiveBooksList from "../components/AllActiveBooksList";

const Home = () => {
  const [name, setName] = useState("");
  const [user, setUser] = useState(""); 
  const getProfile = async () => {
    try {
      const res = await Dashboard.get("/", {
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
    } catch (error) {
      console.error(error);
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
