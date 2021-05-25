import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BooksActive from "../apis/BooksActiveAPI";
import Offers from '../apis/OffersAPI';
import { toast } from 'react-toastify';

toast.configure();

const ActiveBooksList = ({rep, user}) => {
    const {books, setBooks} = useContext(BooksContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BooksActive.get("/", {
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
    const handleMakeOffer = async (ba_id) => {
        try {
            const response = await Offers.post("/", {
                book_active_id: ba_id
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            console.log(response);
            toast.success("Offer made!")
        } catch (error) {
            toast.error("Something went wrong, try again")
            console.error(error);
        }
    }
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
                                { (book.owner!==user) ? 
                                    ((rep<=0) ? 
                                        (<button className="btn btn-secondary" disabled>Not enough reputation</button>) : 
                                        (<Link to={{
                                            pathname: "/success",
                                            state: {
                                                msg: "Offer recorded."
                                            }
                                        }}>
                                            <button onClick={() => {handleMakeOffer(book.book_active_id)}} 
                                            className="btn btn-lg btn-success">Get this book!</button>
                                        </Link>)
                                    ) : (<button className="btn btn-secondary" disabled>You own this book.</button>)}
                            </td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ActiveBooksList;
