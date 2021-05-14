import React from 'react'
import SearchBox from '../components/SearchBox'
import AllActiveBooksList from '../components/AllActiveBooksList'
import Header from '../components/Header'

const Home = () => {
    return (
        <div>
           <Header/>
           <SearchBox/>
           <AllActiveBooksList/>
        </div>
    )
}

export default Home
