import React, {useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BooksContext } from '../context/BooksContext';
import BooksActive from "../apis/BooksActiveAPI";
import Offers from '../apis/OffersAPI';

const ActiveBooksList = ({user}) => {
    console.log(user);
    const {books, setBooks} = useContext(BooksContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BooksActive.get("/all");
                setBooks(response.data.data.Books);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    },[]);
    const handleMakeOffer = async (ba_id) => {
        try {
            console.log(ba_id);
            const response = await Offers.post("/profile/insert", {
                book_active_id: ba_id
            });
            console.log(response);
        } catch (error) {
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
                                    (<Link to={{
                                        pathname: "/success",
                                        state: {
                                            msg: "Offer recorded."
                                        }
                                    }}>
                                        <button onClick={() => {handleMakeOffer(book.book_active_id)}} 
                                        className="btn btn-lg btn-success">Get this book!</button>
                                    </Link>) : (<button className="btn btn-secondary" disabled>You own this book.</button>)}
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
