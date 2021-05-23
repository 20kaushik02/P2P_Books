import React, {useState, createContext} from "react";

export const FiltersContext = createContext();

export const FiltersContextProvider = props => {
const [filters, setFilters] = useState({});
    return (
        <FiltersContext.Provider value = {{ filters, setFilters }}>
            {props.children}
        </FiltersContext.Provider>
    );
}