import React from 'react'
import AddBook from '../components/AddBook'
import BooksList from '../components/BooksList'
import Header from '../components/Header'

const Home = () => {
    return (
        <div>
           <Header/>
           <AddBook/>
           <BooksList/>
        </div>
    )
}

export default Home
