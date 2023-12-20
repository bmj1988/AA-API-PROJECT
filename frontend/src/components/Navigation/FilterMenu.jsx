import { useSearch } from "../../context/Search"
const FilterMenu = () => {
    const {
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
    } = useSearch();



    return (
        <form className="searchFilterForm textmark" id="search-filter">
            <fieldset>
                <input className="searchFilter input" type="number" value={minLat} max={90} min={-90} name="minLat" onChange={() => setMinLat(e.target.value)} />
                <input className="searchFilter input" type="number" value={maxLat} max={90} min={-90} name="maxLat" onChange={() => setMaxLat(e.target.value)} />
                <input className="searchFilter input" type="number" value={minLng} max={180} min={-180} name="minLng" onChange={() => setMinLng(e.target.value)} />
                <input className="searchFilter input" type="number" value={maxLng} max={180} min={-180} name="maxLng" onChange={() => setMaxLng(e.target.value)} />
                <input className="searchFilter input" type="number" value={minPrice} name="minPrice" onChange={() => setMinPrice(e.target.value)} />
                <input className="searchFilter input" type="number" value={maxPrice} name="maxPrice" onChange={() => setMaxPrice(e.target.value)} />
            </fieldset>
        </form>
    )

}
export default FilterMenu;
