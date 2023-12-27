import { useNavigate } from 'react-router-dom'
import './managebookings.css'
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import CancelPrompt from './CancelPrompt';

const SingleStay = ({ booking }) => {
    const navigate = useNavigate();
    const spotInfo = booking.Spot
    const createdAtNew = new Date(booking?.createdAt).toLocaleDateString()

    const spotDetails = (e) => {
        e.preventDefault();
        navigate(`/spots/${spotInfo.id}`)
    }

    return (
        <div className='singleStayContainer'>
            <div className='thumbnailContainer' onClick={(e) => spotDetails(e)}>
                <img className='thumbnail' src={spotInfo.previewImage} alt={'A view of your booked spot'}/>
            </div>
            <div name='spotInfo'>
                <div name='cell'>
                    <p className='cell'>Property: </p><p style={{textAlign: 'end'}}>{`${spotInfo.address}, ${spotInfo.city}, ${spotInfo.state}, ${spotInfo.country}`}</p>
                </div>

            </div>
            <div className='bookingInfo'>
                <div name='cell' className='cell'>
                    <p>Arrival:</p><p>{booking?.startDate}</p>
                </div>
                <div name='cell' className='cell'>
                    <p>Departure:</p><p>{booking?.endDate}</p>
                </div>
                <div name='cell' className='cell'>
                    <p>Date booked:</p><p>{createdAtNew}</p>
                </div>
                <div className='cell'>
                    <button onClick={() => navigate(`/editBooking/${booking.id}`, { state: { booking } })}> Edit </button>
                </div>
                <div className='cell'>
                    <OpenModalButton buttonText='Cancel' modalComponent={<CancelPrompt bookingId={booking.id}/>}/>
                </div>
            </div>
        </div>
    )
}
export default SingleStay;
