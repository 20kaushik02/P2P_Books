import React, { useState, useEffect, Fragment } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarLinks } from './SidebarLinks';
import { IconContext } from 'react-icons';
import '../css/sidebar.css'
import DashboardAPI from '../apis/DashboardAPI';
import LogoutButton from './LogoutButton';
import { useLocation } from 'react-router-dom'

function Sidebar ({ setAuth }) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [name, setName] = useState("");
    const [repScore, setRepScore] = useState("");

    const getProfile = async () => {
        try {
        const res = await DashboardAPI.post("/", {}, {
            headers: { token: localStorage.token }
          });

        const parseData = await res.data;
        setName(parseData.name);
        setRepScore(parseData.reputation);
        } catch (err) {
        console.error(err.message);
        }
    };
  
    useEffect(() => {
      getProfile();
    }, []);
    
    let location = useLocation();
    if((location.pathname === "/login") || (location.pathname === "/register")) {
        return (<div className='sidebar'>
            <div className='sidebar-text'>Login to continue</div>
        </div>
    )};

    return (
    <Fragment>
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar'>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <div className='sidebar-text'>Score: {repScore}</div>
            <Link to='/mydetails' className='menu-bars'>
                <FaIcons.FaUserCircle/>
            </Link>
            <div className="p-3">
                <LogoutButton setAuth={setAuth}/>
            </div>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='sidebar-toggle'>
                <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
                </Link>
            </li>
            {SidebarLinks.map((item, index) => {
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
    </Fragment>
    );
    }

export default Sidebar;