import React, { Fragment } from "react";
import { toast } from "react-toastify";

const LogoutButton = ({ setAuth }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out.");
    } catch (error) {
      toast.error("Could not log out, try again");
      console.error(error);
    }
  };

  return (
    <Fragment>
      <button onClick={(e) => logout(e)} className="btn btn-danger">
        Logout
      </button>
    </Fragment>
  );
};

export default LogoutButton;
