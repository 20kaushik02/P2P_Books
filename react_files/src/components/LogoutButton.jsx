import React, { Fragment } from 'react'

const LogoutButton = ({ setAuth }) => {
    const logout = async (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          setAuth(false);
        } catch (err) {
          console.log(err);
        }
      };
    
    return (
        <Fragment>
            <button onClick={(e) => logout(e)} className="btn btn-danger">
                Logout
            </button>
        </Fragment>
    )
}

export default LogoutButton;
