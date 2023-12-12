import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllSpots } from "../../store/spots";
// import { GridLoader } from 'react-spinners/GridLoader'
import { spotsArray } from "../../store/spots";
import './main.css'
import SingleSpot from "./SingleSpot";
import SpotModal from "./SpotModal/SpotModal";


const Main = ({ props }) => {

    const [spotsLoaded, setSpotsLoaded] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkAllSpots())
            .then(() => setSpotsLoaded(true))
    }, [])

    const spots = useSelector(spotsArray)

    if (!spotsLoaded) return `LOADING > > >`

    return (
        <div className='masterDiv'>
            <div className='mainDiv'>
                {spots.map((spot) => {
                    return (
                        <div className='tooltip' key={spot.id}>
                            <button className={'spotButton'}>
                                <SingleSpot className={'singleSpot'} spot={spot} modalComponent={<SpotModal spot={spot}/>} />
                                <span className='tooltipText'>{spot.name}</span>
                            </button>
                        </div>
                        )
                })}
            </div>
        </div>
    )
}

export default Main;
