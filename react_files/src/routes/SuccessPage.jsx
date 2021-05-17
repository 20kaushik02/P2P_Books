import React, { Fragment, useState } from 'react'
import { Redirect } from 'react-router';
import Header from '../components/Header'

const SuccessPage = (props) => {
    const [toHome, setToHome] = useState(false);
    setTimeout(() => setToHome(true), 2000);
    return (
        <Fragment>
            <Header/>
            <h3>{props.location.state.msg} Redirecting to Home page...</h3>
            {toHome ? (<Redirect to="/"/>): null}
        </Fragment>
    )
}

export default SuccessPage
