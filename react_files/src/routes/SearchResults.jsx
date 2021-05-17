import React, { Fragment, useContext } from "react";
import FilteredActiveBooksList from "../components/FilteredActiveBooksList";
import Header from "../components/Header";
import SearchActiveBooks from "../components/SearchActiveBooks";
import { BooksContext } from "../context/BooksContext";

const SearchResults = () => {
  const { books } = useContext(BooksContext);
  return (
    <Fragment>
      <Header />
      <h4>Search results: {books.length}.</h4>
      <SearchActiveBooks />
      <FilteredActiveBooksList />
    </Fragment>
  );
};

export default SearchResults;
