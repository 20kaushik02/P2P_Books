import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './sidebarData';
import { IconContext } from 'react-icons';
import '../css/sidebar.css'
import axios from 'axios'

function Sidebar( { setAuth } ) {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

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
    <>
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar'>
            <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <button onClick={e => logout(e)} class="btn btn-primary pull-right RbtnMargin" type="button">Log Out</button>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='sidebar-toggle'>
                <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
                </Link>
            </li>
            {SidebarData.map((item, index) => {
                return (
                <li key={index} className={item.cName}>
                    <Link to={item.path}>
                    <span>{item.title}</span>
                    </Link>
                </li>
                );
            })}
            </ul>
        </nav>
        </IconContext.Provider>
    </>
    );
    }

export default Sidebar;