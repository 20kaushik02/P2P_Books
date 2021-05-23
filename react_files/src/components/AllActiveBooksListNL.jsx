import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BooksActive from "../apis/BooksActiveAPI";

const ActiveBooksListNL = () => {
    const {books, setBooks} = useContext(BooksContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BooksActive.get("/", {});
                setBooks(response.data.data.Books);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);
    return (
        <div className="list-group">
            <table className="table table-hover table-light">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                        <th scope="col">Offer</th>
                    </tr>
                </thead>
                <tbody>
                    { books && books.map((book) => {
                        return(
                        <tr key={book.book_active_id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td>
                                <Link to="/login" className="btn btn-lg btn-success">Get this book!</Link>
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ActiveBooksListNL;
