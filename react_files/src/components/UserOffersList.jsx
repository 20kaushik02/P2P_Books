import React, { useContext, useEffect } from 'react'
import { BooksContext } from '../context/BooksContext'
import Offers from '../apis/OffersAPI';

const UserOffersList = () => {
    const { books, setBooks } = useContext(BooksContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Offers.get("/profile/renter/get", {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                console.log(response.data);
                setBooks(response.data.data.Offer);
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
                        <th scope="col">Owner</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Category</th>
                    </tr>
                </thead>
                <tbody>
                    { books && books.map((book) => {
                        return(
                        <tr key={book.offer_id}>
                            <td>{book.owner}</td>
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

export default UserOffersList
