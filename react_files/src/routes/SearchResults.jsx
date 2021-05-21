import React, { Fragment, useContext, useEffect, useState } from "react";
import DashboardAPI from "../apis/DashboardAPI";
import FilteredActiveBooksList from "../components/FilteredActiveBooksList";
import Header from "../components/Header";
import SearchActiveBooks from "../components/SearchActiveBooks";
import { BooksContext } from "../context/BooksContext";

const SearchResults = () => {
  const { books } = useContext(BooksContext);
  const [user, setUser] = useState(""); 
  const getProfile = async () => {
    try {
      const res = await DashboardAPI.post("/", {});
      console.log(res.data.username);
      setUser(res.data.username)
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
      <h4>Search results: {books.length}.</h4>
      <SearchActiveBooks />
      <FilteredActiveBooksList user={user}/>
    </Fragment>
  );
};

export default SearchResults;
