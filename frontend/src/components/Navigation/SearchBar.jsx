import { useState } from 'react'
import './Navigation.css'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkSpotSearch } from '../../store/spots';
import { useSearch } from '../../context/Search';
import FilterMenu from './FilterMenu';
const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('')
    const [showFilterMenu, setShowFilterMenu] = useState(false)

    const {
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice,
    } = useSearch();

    const searchSpots = async () => {
        const searchObj = {
            minLat,
            maxLat,
            minLng,
            maxLng,
            minPrice,
            maxPrice,
            searchString

        }

        const searchedSpots = await dispatch(thunkSpotSearch(searchObj))
        navigate('/search', {...searchedSpots})
    }


    return (
    <form className='searchBar'>
        <button onClick={() => setShowFilterMenu(!showFilterMenu)}><i class="fa-solid fa-toggle-off colormark"/></button>
        {showFilterMenu && <FilterMenu/>}
        <input type='search' placeholder='Enter a destination' className='searchTextInput' onChange={setSearchString(e.target.value)}/>

       <button className='modalMenuItem' onClick={() => searchSpots()} disabled={searchString.length < 1}> <i className="fa-solid fa-trowel-bricks" style={{ color: "#1bcdd0", fontSize: "33px", border: 'none' }} /></button>

    </form>)
}

export default SearchBar
