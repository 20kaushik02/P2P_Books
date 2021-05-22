import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Auth from '../apis/AuthAPI';
import Header from "./Header";

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
    username: "",
    password: ""
    });
  
    const { username, password } = inputs;

    const onChange = async e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    
    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = { username, password };
            const response = await Auth.post("/login", body, {
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
        } catch (error) {
            console.error(error)
        }
    };

    return (
    <Fragment>
        <Header/>
        <h1 className="mt-5 text-center">Login</h1>
        <form className="form-group" action="">
            <input type="text" name="username" value={username} placeholder="username" onChange={e => onChange(e)} className="form-control my-3"/>
            <input type="password" name="password" value={password} placeholder="password" onChange={e => onChange(e)} className="form-control my-3"/>
            <button onClick={(e) => onSubmitForm(e)} className="btn btn-success btn-block">Submit</button>
        </form>
        <br/><br/>
        <Link to="/register">
          <button className="btn btn-warning">Go to Register page</button>
        </Link>
    </Fragment>
    );
  };
  
  export default Login;
