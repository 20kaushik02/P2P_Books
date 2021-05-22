import React, { Fragment, useContext } from 'react'
import { BooksContext } from '../context/BooksContext'
import Header from '../components/Header'
import SearchBooks from '../components/SearchBooks'
import FilteredBooksList from '../components/FilteredBooksList'

const NewActiveBook_2 = () => {
    const { books } = useContext(BooksContext);
    return (
        <Fragment>
            <Header/>
            <h3>Search results: {books.length}. Select a book, or search for another</h3>
            <SearchBooks/>
            <FilteredBooksList/>
        </Fragment>
    )
}

export default NewActiveBook_2
