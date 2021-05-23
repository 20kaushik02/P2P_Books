import React, { Fragment } from 'react'
import Header from '../components/Header'
import SearchRequests from '../components/SearchRequests'
import RequestsList from '../components/RequestsList'

const Requests = () => {
    return (
        <Fragment>
            <Header/>
            <h2>P2P requests</h2>  
            <SearchRequests/>
            <RequestsList/>
        </Fragment>
    )
}

export default Requests
