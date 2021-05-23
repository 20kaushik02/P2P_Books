import React, { useContext, useEffect, useState } from 'react'
import { BooksContext } from '../context/BooksContext';
import { FiltersContext } from '../context/FiltersContext';
import Requests from '../apis/RequestsAPI';
import Books from '../apis/BooksAPI';

const SearchRequests = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("all");
    const { filters, setFilters } = useContext(FiltersContext);
    const { books, setBooks } = useContext(BooksContext);    

    const handleSearchRequest = async (e) => {
        try {
            e.preventDefault();
            const response = await Requests.get("/filter", {
                params: {
                    search_title: title,
                    search_author: author,
                    search_category: category
                }
            });
            console.log(response);
            setBooks(response.data.data.reqBooks);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Requests.get("/");
                console.log(response.data);
                setBooks(response.data.data.reqBooks);
            } catch (error) {
                console.error(error);
            }
        }
        const fetchFilters = async () => {
            try {
                const filters_response = await Books.get("/category");
                setFilters(filters_response.data.data);
                console.log(filters["Categories"]);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
        fetchFilters();
    },[]);
    return (
        <div className="mb-4">
            <form action="">
                <div className="row">
                    <div className="col">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} 
                        type="text" className="form-control" placeholder="Title"/>
                    </div>
                    <div className="col">
                        <input value={author} onChange={(e) => setAuthor(e.target.value)}
                        type="text" className="form-control" placeholder="Author"/>
                    </div>
                    <div className="col">
                        <select value={category} onChange={(e) => setCategory(e.target.value)}
                        className="custom-select my-1 mr-sm-4 fs-5">
                                    <option value="all">All categories</option>
                            { filters["Categories"] && filters["Categories"].map((filter_option) => {
                                return(
                                    <option key = {filter_option.books_id} 
                                    value={filter_option.category}>{filter_option.category}</option>
                                )
                            })}
                        </select>
                    </div>
                </div><br/>
                <div className="row">
                    <div className="col">
                        <button onClick={(e) => {handleSearchRequest(e)}} 
                        className="btn btn-primary">Search P2P requests</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchRequests
