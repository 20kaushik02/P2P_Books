import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import SearchActiveBooks from "../components/SearchActiveBooks";
import AllActiveBooksListNL from "../components/AllActiveBooksListNL";
const HomeNL = () => {

  return (
    <Fragment>
      <Header />
      <h2>Welcome to P2P Books!</h2>
      <SearchActiveBooks />
      <AllActiveBooksListNL/>
    </Fragment>
  );
};

export default HomeNL;
