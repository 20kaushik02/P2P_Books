import React, { useContext } from 'react'
import { BooksContext } from '../context/BooksContext';

const RequestsList = () => {
    const { books, setBooks } = useContext(BooksContext);
    
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
                        <tr key={book.request_id}>
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

export default RequestsList
