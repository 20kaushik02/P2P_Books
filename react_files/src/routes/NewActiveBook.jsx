import React, { Fragment } from "react";

import Header from "../components/Header";
import SearchBooks from "../components/SearchBooks";

const NewActiveBook = () => {
  return (
    <Fragment>
      <Header />
      <h3>Search the P2P Books database for the book you need.</h3>
      <SearchBooks />
    </Fragment>
  );
};

export default NewActiveBook;
