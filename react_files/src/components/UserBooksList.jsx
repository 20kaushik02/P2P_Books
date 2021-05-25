import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BooksActive from "../apis/BooksActiveAPI";
import { toast } from 'react-toastify';

toast.configure();

const UserBooksList = () => {
    const {books, setBooks} = useContext(BooksContext);

    const handleBookStatus = async (book_active_id, new_status) => {
        try {
            console.log(new_status);
            const response = await BooksActive.put("/", {
                book_active_id,
                new_status
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            })
            console.log(response);
            toast.success("Book status updated successfully!")
        } catch (error) {
            toast.error("Something went wrong, try again")
            console.error(error);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BooksActive.get("/profile", {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
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
                        <th scope="col">Status</th>
                        <th scope="col"></th>
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
                                {book.book_status !== 'A' ?
                                    (book.book_status === 'R' ? 'Given out' : 'Not in Circulation') :
                                'Available'}
                            </td>
                            <td>
                                <Link to="/">
                                    {book.book_status === 'R' ?
                                        (<button onClick={()=>handleBookStatus(book.book_active_id, 'N')}
                                        className="btn btn-warning">Book returned by {book.renter}?</button>)
                                        : (book.book_status === 'N' ?
                                            (<button onClick={()=>handleBookStatus(book.book_active_id, 'A')}
                                            className="btn btn-success">Put book into circulation</button> )
                                            : (<button onClick={()=>handleBookStatus(book.book_active_id, 'N')}
                                            className="btn btn-danger">Take book out of circulation</button>)
                                        )
                                    } 
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

export default UserBooksList;
