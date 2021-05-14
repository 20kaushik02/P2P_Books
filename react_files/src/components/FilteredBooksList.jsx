import React, {useContext, useEffect} from 'react'
import { BooksContext } from '../context/BooksContext';

const FilteredBooksList = () => {
    const { books, setBooks } = useContext(BooksContext);
{/*
    useEffect(() => {
        const fetchData = async () => {
            try {
                setBooks(books);
                console.log(response.data.data.Books);
            } catch (error) {
                console.error(error);
            }   
        }   
        fetchData();
    },[]);
*/}
    return (
        <div className="list-group">
            <table className="table table-hover table-light">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    { books && books.map((book) => {
                        return(
                        <tr key={book.books_id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}   

export default FilteredBooksList
