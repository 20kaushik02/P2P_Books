import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Auth from '../apis/AuthAPI';

const Register = ({ setAuth }) => {
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
        street: ""
    });

    const { username, password, name, phone, mail, dob, gender, state, city, area, street } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const response = await Auth.post("/register", {
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
                street
            }, {
                headers: { "Content-type": "application/json" }
            });     

        const parseRes = await response.data
        console.log(parseRes)
        if (parseRes.jwtToken) {
            localStorage.setItem("token", parseRes.jwtToken);
            setAuth(true);
        } else {
            setAuth(false);
        }
    } catch (err) {
        console.log(err)
    }
    };

    return (
        <Fragment>
        <h1 className="mt-5 text-center">Register</h1>
        <form onSubmit={onSubmitForm}>
            <input type="text" name="username" value={username} placeholder="username" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="password" name="password" value={password} placeholder="password" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="name" value={name} placeholder="name" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="phone" value={phone} placeholder="phone" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="mail" value={mail} placeholder="email" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="date" name="dob" value={dob} placeholder="dob" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="gender" value={gender} placeholder="gender" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="state" value={state} placeholder="state" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="city" value={city} placeholder="city" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="area" value={area} placeholder="area" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="text" name="street" value={street} placeholder="street" onChange={e => onChange(e)} className="form-control my-3"/>   
            <button class="btn btn-success btn-block">Submit</button>
        </form>
        <Link to="/login">login</Link>
        </Fragment>
    );
};

export default Register;