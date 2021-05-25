import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';

const RequestsListNL = () => {
    const { books, setBooks } = useContext(BooksContext);
    
    return (
        <div className="list-group">
            <table className="table table-hover table-light">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    { books && books.map((book) => {
                        return(
                        <tr key={book.request_id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>
                                <Link to="/login">
                                    <button className="btn btn-success">Share this book!</button>
                                </Link>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RequestsListNL
