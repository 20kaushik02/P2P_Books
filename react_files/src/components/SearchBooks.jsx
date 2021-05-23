import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import { FiltersContext } from '../context/FiltersContext';
import Books from '../apis/BooksAPI';

const SearchBooks = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("all");
    const { filters, setFilters } = useContext(FiltersContext);
    const { books, setBooks } = useContext(BooksContext);

    const handleSearchBook = async () => {
        try {
            const response = await Books.get("/filter", {
                params: {
                    search_title: title,
                    search_author: author,
                    search_category: category
                }, headers: {
                    token: localStorage.getItem("token")
                }
            });
            setBooks(response.data.data.Books);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const filters_response = await Books.get("/sorting")
                setFilters(filters_response.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFilters();
        handleSearchBook();
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
                    <Link to="/newactivebook2">
                        <button onClick={handleSearchBook} className="btn btn-primary">Search</button>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default SearchBooks;