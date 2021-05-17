import React, { useState, useEffect, Fragment } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarLinks } from './SidebarLinks';
import { IconContext } from 'react-icons';
import '../css/sidebar.css'
import DashboardAPI from '../apis/DashboardAPI';
import LogoutButton from './LogoutButton';

function Sidebar ({ setAuth }) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
        const res = await DashboardAPI.post("/", {}, {
            headers: { token: localStorage.token }
          });

        const parseData = await res.data;
        console.log(parseData)
        setName(parseData.name);
        } catch (err) {
        console.error(err.message);
        }
    };
  
    useEffect(() => {
      getProfile();
    }, []);

    return (
    <Fragment>
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className='sidebar'>
            <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar} />
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