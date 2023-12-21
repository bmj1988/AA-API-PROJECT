import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
// import { GridLoader } from 'react-spinners/GridLoader'
import { spotsArray, thunkGetOwnSpots } from "../../store/spots";
import SingleSpot from "../Main/SingleSpot";
import SpotModal from "../Main/SpotModal/SpotModal";
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import { useDispatch } from "react-redux";
import SpotDeleteModal from "./SpotDeleteModal";
import UpdateSpotModal from "./UpdateSpotModal";
import './ManageSpots.css'
import SpotFormModal from "../SpotFormModal/SpotForm";
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";

const ManageSpots = () => {
    const { modalView } = useModal();
    const [ownSpotsLoaded, setOnSpotsLoaded] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.session.user)
    const spots = useSelector(spotsArray)
    const ownSpots = spots.filter((spot) => spot.ownerId === user.id)
    useEffect(() => {
        if (ownSpotsLoaded) return
        dispatch(thunkGetOwnSpots())
            .then(() => setOnSpotsLoaded(true));
    })

    if (!ownSpots) return (
        <div className='masterDiv'>
            <div style={{ display: 'block', margin: 0 }}>
                <h1>Manage your spots</h1>
                {modalView && <OpenModalButton modalComponent={<SpotFormModal />} buttonText={'Create new Spot'} />}
                {!modalView && <button onClick={() => navigate('/createSpot')}>Create a New Spot</button>}
            </div>
        </div>
    )

    return (
        <div className='masterDiv'>
            <div style={{ display: 'block', margin: '0' }}>
                <h1>Manage your spots</h1>
                {modalView && <OpenModalButton modalComponent={<SpotFormModal />} buttonText={'Create new Spot'} />}
                {!modalView && <button onClick={() => navigate('../createSpot')}>Create a New Spot</button>}
            </div>
            <div className='mainDiv' style={{ marginLeft: '10px' }}>
                {ownSpots.map((spot) => {
                    return (
                        <div className='tooltip' key={spot.id}>
                            <button className={'spotButton'}>
                                <SingleSpot className={'singleSpot'} spot={spot} modalComponent={<SpotModal spot={spot} />} />
                                <span className='tooltipText'>{spot.name}</span>
                            </button>
                            <div className="ownSpotsButton">
                                {modalView ? <OpenModalButton modalComponent={<UpdateSpotModal spot={spot} />} buttonText={'Update'}/> : <button onClick={() => navigate(`../updateSpot/${spot.id}`, {id: spot.id})}>Update</button>}
                                <OpenModalButton modalComponent={<SpotDeleteModal spotId={spot.id} />} buttonText={'Delete'} className={'boxButton'} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ManageSpots;
