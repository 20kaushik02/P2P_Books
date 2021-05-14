import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BooksActive from '../apis/BooksActiveAPI';
import { BooksContext } from '../context/BooksContext';
import { CategoriesContext } from '../context/CategoriesContext';

const SearchBox = (props) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const { categories, setCategories } = useContext(CategoriesContext);
    const { books, setBooks } = useContext(BooksContext);

    const handleSearchBook = async (e) => {
        try {
            const response = await BooksActive.get("/filter", {
                params: {
                    search_title: title,
                    search_author: author,
                    search_category: category
                }
            });
            setBooks(response.data.data.Books);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories_response = await BooksActive.get("/category")
                setCategories(categories_response.data.data.Categories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
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
                        className="custom-select my-1 mr-sm-2">
                                    <option value="all">All categories</option>
                            { categories && categories.map((category_option) => {
                                return(
                                    <option key = {category_option.books_id} 
                                    value={category_option.category}>{category_option.category}</option>
                                )  
                            })}
                        </select>
                    </div>
                    <div className="col">
                        <Link to="/search">
                            <button onClick={handleSearchBook} className="btn btn-primary">Search</button>
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SearchBox;