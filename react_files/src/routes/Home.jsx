import React, { useEffect, useState } from "react";
import SearchBox from '../components/SearchBox'
import AllActiveBooksList from '../components/AllActiveBooksList'
import Header from '../components/Header'
import axios from 'axios';

const Home = ( { setAuth }) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
        const res = await axios({
            method: 'POST',
            url: "http://localhost:9001/api/dashboard",
            headers: { token: localStorage.token }, 
        });

        console.log(res)
        const parseData = await res.data
        console.log(parseData)
        setName(parseData.name);
        } catch (err) {
        console.error(err.message);
        }
    };
  
    const logout = async e => {
      e.preventDefault();
      try {
        localStorage.removeItem("token");
        setAuth(false);
      } catch (err) {
        console.log(err)
      }
    };
  
    useEffect(() => {
      getProfile();
    }, []);

    return (
        <div>
            <h2>Welcome {name}</h2>
            <button onClick={e => logout(e)} className="btn btn-primary">Logout</button>
            <Header/>
            <SearchBox/>
            <AllActiveBooksList/>
        </div>
    )
}

export default Home
