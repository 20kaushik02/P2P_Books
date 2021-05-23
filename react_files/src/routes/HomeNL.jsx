import React, { Fragment, useEffect, useState } from "react";
import Header from "../components/Header";
import SearchActiveBooks from "../components/SearchActiveBooks";
import AllActiveBooksListNL from "../components/AllActiveBooksListNL";
const HomeNL = () => {

  return (
    <Fragment>
      <Header />
      <SearchActiveBooks />
      <AllActiveBooksListNL/>
    </Fragment>
  );
};

export default HomeNL;
