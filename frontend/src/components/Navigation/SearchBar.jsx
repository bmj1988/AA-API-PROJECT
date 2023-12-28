import { useState } from 'react'
import './Navigation.css'
import { useNavigate } from 'react-router-dom';
import { thunkSpotSearch } from '../../store/spots';
import { useSearch } from '../../context/Search';
import FilterMenu from './FilterMenu';

const SearchBar = () => {
    const navigate = useNavigate();
    const [locality, setLocality] = useState('')


    const {
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice,
        showFilterMenu,
        setShowFilterMenu
    } = useSearch();

    const searchSpots = async (e) => {
        e.preventDefault();
        const searchObj = {
            minLat: minLat.toString(),
            maxLat: maxLat.toString(),
            minLng: minLng.toString(),
            maxLng: maxLng.toString(),
            minPrice: minPrice.toString(),
            maxPrice: maxPrice.toString(),
            locality

        }
        console.log(Object.entries(searchObj))
        const params = new URLSearchParams(Object.entries(searchObj)).toString();
        const searchedSpots = await thunkSpotSearch(params)
        navigate(`/search?${params}`, { state: searchedSpots })
    }


    return (
        <div style={{ display: 'flex' }}>
            <button className='filterButton' onClick={(e) => {
                e.preventDefault();
                setShowFilterMenu(!showFilterMenu)
            }}><i className="fa-solid fa-toggle-off colormark filterIcon" /></button>
            {showFilterMenu && <FilterMenu/>}
            <form className='searchBar'>

                <input type='search' placeholder='Enter a destination' className='searchTextInput' onChange={(e) => setLocality(e.target.value)} />

                <button className='modalMenuItem' onClick={(e) => searchSpots(e)}> <i className="fa-solid fa-trowel-bricks" style={{ color: "#1bcdd0", fontSize: "33px", border: 'none' }} /></button>

            </form>
        </div>)
}

export default SearchBar
