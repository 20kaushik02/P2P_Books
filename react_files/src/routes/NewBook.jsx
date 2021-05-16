import React, { Fragment } from 'react'
import AddBook from '../components/AddBook'
import Header from '../components/Header'

const NewBook = ({ setAuth }) => {
    return (
        <Fragment>
            <Header/>
            <AddBook setAuth={setAuth}/>
        </Fragment>
    )
}

export default NewBook;
