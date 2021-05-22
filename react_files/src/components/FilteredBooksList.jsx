import React, {Fragment, useContext} from 'react'
import { Link } from 'react-router-dom';
import BooksActiveAPI from '../apis/BooksActiveAPI';
import { BooksContext } from '../context/BooksContext';

const FilteredBooksList = () => {
    const { books, setBooks } = useContext(BooksContext);

    const handleNewActiveBook = async (books_id) => {
        try {
            const response = await BooksActiveAPI.post("/", {
                books_id
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            console.log("added book to books_active:" + response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <Fragment>
            <Link to="/newbook">
                    <button className="btn btn-warning">Can't find the book you're looking for?</button>
            </Link><br/><br/>
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
                            <tr key={book.books_id}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.category}</td>
                                <td>
                                    <Link to={{
                                        pathname:"/success",
                                        state:{
                                            msg:"Your book is now in circulation."
                                        }
                                    }}>
                                        <button onClick={() => {handleNewActiveBook(book.books_id)}} 
                                        className="btn btn-success">Put up for sale</button>
                                    </Link>
                                </td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Link to="/newbook">
                    <button className="btn btn-warning">Can't find the book you're looking for?</button>
                </Link><br/><br/>
            </div>
        </Fragment>
    )
}   

export default FilteredBooksList;
