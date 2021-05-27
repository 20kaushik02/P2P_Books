import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Auth from "../apis/AuthAPI";

toast.configure();

const Register = ({ setAuth }) => {
  var min_dob = new Date();
  var max_dob = new Date();
  min_dob.setDate(min_dob.getDate() - 150 * 365);
  max_dob.setDate(max_dob.getDate() - 18 * 365);
  
  const [disable, setDisable] = useState(true);
  const [locDisable, setLocDisable] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    name: "",
    phone: "",
    mail: "",
    dob: "",
    gender: "",
    state: "",
    city: "",
    area: "",
    street: "",
  });

  const {
    username,
    password,
    name,
    phone,
    mail,
    dob,
    gender,
    state,
    city,
    area,
    street,
  } = inputs;

  const universityChecked = (e) => {
    if(!locDisable) {
    setInputs({   
      username: inputs.username,
      password: inputs.password,
      name: inputs.name,
      phone: inputs.phone,
      mail: inputs.mail,
      dob: inputs.dob,
      gender: inputs.gender, 
      state: "Tamil Nadu",
      city: "Chennai",
      area: "Guindy",
      street: "Anna University, Sardar Patel Road",
    });
    setLocDisable(true);
  } else {
    setInputs({
      username: inputs.username,
      password: inputs.password,
      name: inputs.name,
      phone: inputs.phone,
      mail: inputs.mail,
      dob: inputs.dob,
      gender: inputs.gender, 
      state: "",
      city: "",
      area: "",
      street: "",
    });
      setLocDisable(false);
    }
  }
  useEffect(() => {
    checkInput();
  }, [inputs]);

  const checkInput = () => {
    setDisable(!Object.values(inputs).every((val) => val !== ""));
  };

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  
  useEffect(() => {
    checkInput();
  }, [inputs]);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await Auth.post(
        "/register",
        {
          username,
          password,
          name,
          phone,
          mail,
          dob,
          gender,
          state,
          city,
          area,
          street,
        },
        {
          headers: { "Content-type": "application/json" },
        }
      );

      const parseRes = response.data;
      console.log(parseRes);
      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Welcome to P2P Books!");
      } else {
        setAuth(false);
      }
    } catch (error) {
      toast.error("Something went wrong, try again");
      console.error(error);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Register</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="name"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="phone"
          value={phone}
          placeholder="phone"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="mail"
          value={mail}
          placeholder="email"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="date"
          name="dob"
          value={dob}
          min={min_dob.toISOString().split("T")[0]}
          max={max_dob.toISOString().split("T")[0]}
          placeholder="dob"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        Male
        <input
          type="radio"
          value="M"
          name="gender"
          style={{ marginLeft: 10, marginRight: 30 }}
          onChange={(e) => onChange(e)}
        />
        Female
        <input
          type="radio"
          value="F"
          name="gender"
          style={{ marginLeft: 10, marginRight: 30 }}
          onChange={(e) => onChange(e)}
        />
        Other
        <input
          type="radio"
          value="O"
          name="gender"
          style={{ marginLeft: 10, marginRight: 30 }}
          onChange={(e) => onChange(e)}
        />
        <br />
        <hr />
        <input 
          type="checkbox" 
          className="university"
          style={{ marginLeft: 10, marginRight: 30 }}
          onChange={(e) => universityChecked(e)}
        />
        Anna University Student
        <fieldset disabled={locDisable}>
        <input
          type="text"
          name="state"
          value={state}
          placeholder="state"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="city"
          value={city}
          placeholder="city"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="area"
          value={area}
          placeholder="area"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        <input
          type="text"
          name="street"
          value={street}
          placeholder="street"
          onChange={(e) => onChange(e)}
          className="form-control my-3"
        />
        </fieldset>
        <button disabled={disable} className="btn btn-success btn-block">
          Submit
        </button>
      </form>
      <br />
      <Link to="/login">
        <button className="btn btn-warning">Go to Login page</button>
      </Link>
      <br />
      <br />
    </Fragment>
  );
};

export default Register;
