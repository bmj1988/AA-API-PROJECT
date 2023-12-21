import { useSearch } from "../../context/Search"
// import { useEffect, useRef } from "react";
const FilterMenu = () => {
    // const filterRef = useRef();
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
        setMaxPrice,
        showFilterMenu,
        // setShowFilterMenu
    } = useSearch();

    // useEffect(() => {
    //     if (!showFilterMenu) return
    //     const closeMenu = (e) => {
    //         console.log(e.target)
    //         if (filterRef.current && !filterRef.current.contains(e.target)) {
    //             console.log('hello')
    //             setShowFilterMenu(false);
    //         }
    //     }
    //     document.addEventListener('click', closeMenu)

    //     return () => document.removeEventListener('click', closeMenu);
    // }, [showFilterMenu]); ref={filterRef}

    return (
        <div className={showFilterMenu ? '' : 'hidden'} >
        <form className="searchFilterForm textmark" id="search-filter">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Latitude between</p>
                <input className="searchFilter input" type="number" value={minLat} max={90} min={-90} name="minLat" onChange={(e) => setMinLat(e.target.value)} />
                <p> and </p>
                <input className="searchFilter input" type="number" value={maxLat} max={90} min={-90} name="maxLat" onChange={(e) => setMaxLat(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Longitude between</p>
                <input className="searchFilter input" type="number" value={minLng} max={180} min={-180} name="minLng" onChange={(e) => setMinLng(e.target.value)} />
                <p> and </p>
                <input className="searchFilter input" type="number" value={maxLng} max={180} min={-180} name="maxLng" onChange={(e) => setMaxLng(e.target.value)} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Price ($USD) between</p>
                <input className="searchFilter input" type="number" value={minPrice} min={0} name="minPrice" onChange={(e) => setMinPrice(e.target.value)} />
                <p>and</p>
                <input className="searchFilter input" type="number" value={maxPrice} name="maxPrice" onChange={(e) => setMaxPrice(e.target.value)} />
                <p>per night</p>
            </div>
        </form>
        </div>
    )

}
export default FilterMenu;
