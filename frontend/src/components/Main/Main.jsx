import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAllSpots } from "../../store/spots";
import { spotsArray } from "../../store/spots";
import './main.css'
import SingleSpot from "./SingleSpot";
import SpotModal from "./SpotModal/SpotModal";
import Spinner from "../Spinner";



const Main = () => {

    const [spotsLoaded, setSpotsLoaded] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkAllSpots())
            .then(() => setSpotsLoaded(true))
    }, [dispatch])

    const spots = useSelector(spotsArray)

    if (!spotsLoaded) return (
        <Spinner/>
    )


    return (
        <div className='masterDiv'>
            <div className='mainDiv'>
                {spots.map((spot) => {
                    return (
                        <div className='tooltip' key={spot.id}>
                            <button className={'spotButton'}>
                                <SingleSpot className={'singleSpot'} spot={spot} modalComponent={<SpotModal spot={spot} />} />
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
