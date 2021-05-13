import React, {useContext, useEffect} from 'react';
import BookFinder from "../apis/BooksReactAPI";
import { BooksContext } from '../context/BooksContext';

const BooksList = (props) => {
    const {books, setBooks} = useContext(BooksContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BookFinder.get("/");
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
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    { books && books.map((book) => {
                        return(
                        <tr key={book.books_id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.category}</td>
                            <td><button className="btn btn-warning">Update</button></td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                        )
                    })}
                    {/*<tr>
                    <td>1984</td>
                    <td>George Orwell</td>
                    <td>Dystopia</td>
                    <td><button className="btn btn-warning">Update</button></td>
                    <td><button className="btn btn-danger">Delete</button></td>
                    </tr>*/}
                </tbody>
            </table>
        </div>
    )
}

export default BooksList;
