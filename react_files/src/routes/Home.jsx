import React, { useEffect, useState } from "react";
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

      const parseData = res.data;
      setName(parseData.name);
    } catch (err) {
      console.error(err.message);
    }
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h2>Welcome {name}</h2>
      <button onClick={(e) => logout(e)} className="btn btn-danger">
        Logout
      </button>
      <Header />
      <SearchBox />
      <AllActiveBooksList />
    </div>
  );
};

export default Home;
