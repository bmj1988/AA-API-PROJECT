import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export function useSearch() {
    return useContext(SearchContext)
}

export function SearchProvider({children}) {
    const [minLat, setMinLat] = useState(-90);
    const [maxLat, setMaxLat] = useState(90);
    const [minLng, setMinLng] = useState(-180);
    const [maxLng, setMaxLng] = useState(180);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    const searchValues = {
        minLat,
        setMinLat,
        maxLat,
        setMaxLat,
        minLng,
        setMinLng,
        maxLng,
        setMaxLng,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice
    }

    return (
        <SearchContext.Provider value={searchValues}>
            {children}
        </SearchContext.Provider>
    )
}
