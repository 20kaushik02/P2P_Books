import React, { Fragment, useContext, useEffect, useState } from "react";
import { BooksContext } from "../context/BooksContext";
import Dashboard from "../apis/DashboardAPI";
import Header from "../components/Header";
import SearchActiveBooks from "../components/SearchActiveBooks";
import FilteredActiveBooksList from "../components/FilteredActiveBooksList";

const SearchResults = () => {
  const { books } = useContext(BooksContext);
  const [user, setUser] = useState(""); 
  const [rep, setRep] = useState();
  const getProfile = async () => {
    try {
      const res = await Dashboard.get("/", {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      console.log(res.data.username);
      setUser(res.data.username);
      setRep(res.data.reputation);
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
      <h4>Search results: {books.length}.</h4>
      <SearchActiveBooks />
      <FilteredActiveBooksList rep={rep} user={user}/>
    </Fragment>
  );
};

export default SearchResults;
