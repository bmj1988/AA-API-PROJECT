import { useState } from 'react'
import './Navigation.css'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { thunkSpotSearch } from '../../store/spots';

const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchString, setSearchString] = useState('')

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


    return (<form className='searchBar'>
        <input type='search' placeholder='Build your search' className='searchTextInput' onChange={setSearchString(e.target.value)}/>

       <button className='modalMenuItem' onClick={() => searchSpots()}> <i className="fa-solid fa-trowel-bricks" style={{ color: "#1bcdd0", fontSize: "33px", border: 'none' }} /></button>

    </form>)
}

export default SearchBar
