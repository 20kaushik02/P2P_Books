import React, { useContext, useEffect, useState } from 'react'
import Notifications from '../apis/NotificationsAPI'
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';

const UserNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    
    const handleRemoveNotification = async (notif_id) => {
        try {
            const response = await Notifications.delete("/", {
                params: {
                    notif_id
                }, headers: {
                    token: localStorage.getItem("token")
                }
            });
            console.log(notifications);
            setNotifications(notifications.filter(notification => notification.notif_id !== notif_id));
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    console.log(typeof(notifications));
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Notifications.get("/", {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                setNotifications(...notifications, response.data.data.reqMessages);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);
    console.log(notifications);
    return (
            <div className="list-group">
            <h1>My Messages</h1>
            <table className="table table-hover table-light">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Date</th>
                        <th scope="col">Message</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { notifications && notifications.map((message) => {
                        return(
                        <tr key={message.notif_id}>
                            <td>{message.message_date}</td>
                            <td>{message.message}</td>
                            <td>
                                <Link to='#' className='menu-bars'>
                                    <FaIcons.FaTimes onClick={()=>handleRemoveNotification(message.notif_id)} />
                                </Link>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserNotifications;
