import { useModal } from "../../context/Modal"
import { thunkSpotById } from "../../store/spots";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SingleSpot = ({ spot, modalComponent, onSpotClick, onModalClose }) => {
    const { setModalContent, setOnModalClose, modalView } = useModal();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClick = async () => {
        if (!modalView) navigate(`/spots/${spot.id}`)
        else {
        await dispatch(thunkSpotById(spot.id))
        if (typeof onSpotClick === 'function') onSpotClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);}
    }

    return (
        <div className="singleSpotMain" onClick={handleClick}>
            <div className='singleSpotImage'>
                <img className='imageClass' src={spot.previewImage} />
            </div>
            <div className='singleSpotBlurb'>
                <div className='addressRatingFlex'>
                    <p style={{ cursor: 'pointer' }}>{`${spot.city}, ${spot.state}`}</p>
                    <div style={{ display: 'inline' }} className={`starRating`}>
                        <i className="fa-solid fa-star" />{spot.avgRating || 'New'}
                    </div>
                </div>
                <div style={{ display: 'flex' }}><p className={'priceContainer'}><span className="spotPrice">{`$${spot.price.toFixed(2)} `}</span>{'per night'}</p></div>

            </div>
        </div>
    )
}

export default SingleSpot
