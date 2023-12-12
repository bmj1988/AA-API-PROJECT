import { useModal } from "../../context/Modal"
import { thunkSpotById } from "../../store/spots";
import { useDispatch } from "react-redux";

const SingleSpot = ({ spot, modalComponent, onSpotClick, onModalClose }) => {
    const {setModalContent, setOnModalClose} = useModal();
    const dispatch = useDispatch();
    const handleClick = async () => {
        await dispatch(thunkSpotById(spot.id))
        if (typeof onSpotClick === 'function') onSpotClick();
        if (onModalClose) setOnModalClose(onModalClose);
        setModalContent(modalComponent);
    }

    return (
        <div className="singleSpotMain" onClick={handleClick}>
            <div className='singleSpotImage'>
                <img className='imageClass' src={spot.previewImage} />
            </div>
            <div className='singleSpotBlurb'>
                <div className='addressRatingFlex'>
                    <p style={{cursor:'pointer'}}>{`${spot.city}, ${spot.state}`}</p>
                    <div className={`starRating`}>
                        <i className="fa-solid fa-star" />{spot.avgRating}
                    </div>
                </div>
                <div style={{display: 'flex'}}><p className={'priceContainer'}><span className="spotPrice">{`$${spot.price} `}</span>{'per night'}</p></div>

            </div>
        </div>
    )
}

export default SingleSpot

// <FontAwesomeIcon icon="fa-solid fa-star" /> star for rating
