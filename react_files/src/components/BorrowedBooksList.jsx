import React, { useContext, useEffect } from 'react'
import { toast } from 'react-toastify';
import BooksActive from '../apis/BooksActiveAPI';
import { OffersContext } from '../context/OffersContext';

toast.configure();

const BorrowedBooksList = () => {
    const { offers, setOffers } = useContext(OffersContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BooksActive.get("/profile/borrowed", {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                setOffers(response.data.data.Books);
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
                        <th scope="col">Contact details</th>
                    </tr>
                </thead>
                <tbody>
                    {offers && offers.map((offer) => {
                        return(
                            <tr key={offer.book_active_id}>
                                <td>{offer.owner}</td>
                                <td>{offer.title}</td>
                                <td><p>Phone: {offer.phone}<br/>Mail: {offer.mail}</p></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BorrowedBooksList
