import React, { Fragment } from "react";

import Header from "../components/Header";
import SearchRequests from "../components/SearchRequests";
import RequestsListNL from "../components/RequestsListNL";

const RequestsNL = () => {
  return (
    <Fragment>
      <Header />
      <h2>P2P requests</h2>
      <SearchRequests />
      <RequestsListNL />
    </Fragment>
  );
};

export default RequestsNL;
