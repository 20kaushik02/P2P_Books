import React, {useState, createContext} from "react";

export const OffersContext = createContext();

export const OffersContextProvider = props => {
const [offers, setOffers] = useState([]);
    return (
        <OffersContext.Provider value = {{ offers, setOffers }}>
            {props.children}
        </OffersContext.Provider>
    );
}