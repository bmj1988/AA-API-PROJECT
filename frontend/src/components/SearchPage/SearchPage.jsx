import { useLocation } from "react-router-dom"
import SingleSpot from "../Main/SingleSpot";
import '../Main/main.css'
import SpotModal from '../Main/SpotModal/SpotModal'

const SearchPage = () => {
    const { state } = useLocation();
    const searchedSpotsArray = state?.Spots;

    return (
        <>
        <h1 className="textmark" style={{position:'sticky', top: '100px', backgroundColor:'white',zIndex: '4', marginBottom: '10px'}}>Search Results</h1>
        <div className='masterDiv'>

        <div className='mainDiv'>
            {searchedSpotsArray?.length > 0 && searchedSpotsArray?.map((spot) => {
                return (
                    <div className='tooltip' key={spot.id}>
                        <button className={'spotButton'}>
                            <SingleSpot className={'singleSpot'} spot={spot} modalComponent={<SpotModal spot={spot} />} />
                            <span className='tooltipText'>{spot.name}</span>
                        </button>
                    </div>
                )
            })}
            {searchedSpotsArray?.length < 0 && <div>
                <h3>No spots were found that match your search</h3>
                </div>}
        </div>
    </div>
    </>
    )
}

export default SearchPage;
