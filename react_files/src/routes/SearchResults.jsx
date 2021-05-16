import React, { Fragment, useContext } from "react";
import FilteredBooksList from "../components/FilteredBooksList";
import Header from "../components/Header";
import SearchBox from "../components/SearchBox";
import { BooksContext } from "../context/BooksContext";

const SearchResults = ({ setAuth }) => {
  const { books } = useContext(BooksContext);
  return (
    <Fragment>
      <Header />
      <h4>Search results:{books.length}</h4>
      <SearchBox />
      <FilteredBooksList />
    </Fragment>
  );
};

export default SearchResults;
