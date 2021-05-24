import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Auth from "../apis/AuthAPI";
import Dashboard from '../apis/DashboardAPI';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Update = () => {
  const getProfile = async () => {
    try {
    const res = await Dashboard.get("/", {
        headers: {
            token: localStorage.getItem("token") 
        }
      });

    const parseData = await res.data;
    setInputs({
      name: parseData.name, 
      phone: parseData.phone, 
      mail: parseData.mail,
      state: parseData.state,
      city: parseData.city,
      area: parseData.area,
      street: parseData.street,
    });   
    } catch (error) {
    console.error(error);
    }
  };

  const [disable, setDisable] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    phone: "",
    mail: "",
    state: "",
    city: "",
    area: "",
    street: "",
  });

  useEffect(() => {
    getProfile();
  }, []);  

  const {
    name,
    phone,
    mail,
    state,
    city,
    area,
    street,
  } = inputs;
  
  const checkInput = () => {
    setDisable(!(Object.values(inputs).every( val => val.length !== 0)));
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    checkInput();
  });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await Auth.put("/", {
          name,
          phone,
          mail,
          state,
          city,
          area,
          street,
        },{
          headers: {
            token: localStorage.getItem("token")
        }
      });
      if(response.status === 201)
        toast.success("Updated Successfully");
    } catch (error) {
      toast.error("Something went wrong, try again")
      console.error(error);
    }
  };

  return (
    <Fragment>
      <h1 className="mt-5 text-center">Update your information</h1>
      <form onSubmit={onSubmitForm}>
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
        <button disabled={disable} className="btn btn-success btn-block">Update</button>
      </form>
      <br/><br/>
    </Fragment>
  );
};

export default Update;
