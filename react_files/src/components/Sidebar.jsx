import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import '../css/sidebar.css'
import Dashboard from '../apis/DashboardAPI';
import Notifications from '../apis/NotificationsAPI';
import LogoutButton from './LogoutButton';
import { SidebarLinks } from './SidebarLinks';

function Sidebar ({ auth, setAuth }) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const [repScore, setRepScore] = useState();
    const [notifCount, setNotifCount] = useState(0);

    const getProfile = async () => {
        try {
            const res = await Dashboard.get("/", {
                headers: {
                    token: localStorage.getItem("token") 
                }
            });
        
            const parseData = await res.data;
            setRepScore(parseData.reputation);
        } catch (error) {
        console.error(error);
        }
    };
  
    const getNotifCount = async () => {
        try {
            const res = await Notifications.get("/notif-count", {
                headers: {
                    token: localStorage.getItem("token") 
                }
            });
            setNotifCount(res.data.data["Count"]);
            console.log(notifCount);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
      getProfile();
    }, []);
    
    let location = useLocation();
    if((location.pathname === "/login") || (location.pathname === "/register")) {
        return (<div className='sidebar'>
            <div className='sidebar-text'>Login to continue</div>
        </div>
    )}
    
    else if (((location.pathname === "/requests") || (location.pathname === "/search") || (location.pathname === "/")) && (!auth)) {
        console.log(auth);
        console.log("test");
        return (
            <div className='sidebar'>
                <div style = {{ marginLeft : 10 , marginRight : 30}}>
                    <Link to="/login" className="btn btn-lg btn-success">Login</Link>
                </div>
                <div style = {{ marginLeft : 10 , marginRight : 30}}>
                    <Link to="/register" className="btn btn-lg btn-warning">Register</Link>
                </div>
                <div style = {{ marginLeft : 10 , marginRight : 30}}>
                    <Link to="/requests" className="btn btn-lg btn-primary">Requests</Link>
                </div>
                
            </div>
        )
    }

    else {
        getProfile(); 
        getNotifCount();
        return (
            <Fragment>
                <IconContext.Provider value={{ color: '#fff' }}>
                    <div className='sidebar'>
                        <Link to='#' className='menu-bars'>
                            <FaIcons.FaBars onClick={showSidebar} />
                        </Link>
                        <div className='sidebar-text'>Score: {repScore}</div>
                        <div>
                            <Link to='/my-details' className='menu-bars'>
                                <FaIcons.FaUserCircle/>
                            </Link>
                        </div>
                        <div>
                            <Link to='/my-messages' className='menu-bars'>
                                <FaIcons.FaEnvelope/>
                            </Link>
                        </div>
                        <div className='notif-icon'>
                            {((notifCount != 0) ? <FaIcons.FaExclamationCircle />: null)}
                        </div>
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
}
export default Sidebar;