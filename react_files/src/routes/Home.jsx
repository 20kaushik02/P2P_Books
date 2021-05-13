import React from 'react'
import SearchBox from '../components/SearchBox'
import BooksList from '../components/BooksList'
import Header from '../components/Header'

const Home = () => {
    return (
        <div>
           <Header/>
           <SearchBox/>
           <BooksList/>
        </div>
    )
}

export default Home
