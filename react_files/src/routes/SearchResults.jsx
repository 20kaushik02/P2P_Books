import React from 'react'
import FilteredBooksList from '../components/FilteredBooksList'
import Header from "../components/Header"
import SearchBox from "../components/SearchBox"


const SearchResults = () => {
    return (
        <div>
            <Header/>
            <SearchBox/>
            <FilteredBooksList/>
        </div>
    )
}

export default SearchResults;
