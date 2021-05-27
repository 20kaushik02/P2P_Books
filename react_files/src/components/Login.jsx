import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Auth from "../apis/AuthAPI";

import Header from "./Header";

toast.configure();
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);
  
  const { username, password } = inputs;

  const checkInput = () => {
    setDisable(!Object.values(inputs).every((val) => val.length !== 0));
  };

  const onChange = async (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    checkInput();
  }, [inputs]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { username, password };
      const response = await Auth.post("/login", body, {
        headers: { "Content-type": "application/json" },
      }).catch(error => {
        toast.warning(error.response.data.msg);
        console.error(error.response);
      });
      
      const parseRes = await response.data;

      console.log(parseRes);
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in!");
      } else {
        setAuth(false);
      }
    } catch (error) {
      toast.error("Could not login, try again");
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Header />
      <h1 className="mt-5 text-center">Login</h1>
      <form className="form-group" action="">
        <input
          type="text"
          name="username"
          value={username}
          placeholder="Enter username/email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <button
          disabled={disable}
          onClick={(e) => onSubmitForm(e)}
          className="btn btn-success btn-block"
        >
          Login
        </button>
      </form>
      <br />
      <br />
      <Link to="/register">
        <button className="btn btn-warning">Go to Register page</button>
      </Link>
    </Fragment>
  );
};

export default Login;
