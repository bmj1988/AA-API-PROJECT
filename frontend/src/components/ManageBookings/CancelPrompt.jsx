import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal";
import { thunkDeleteBooking } from "../../store/bookings";

const CancelPrompt = ({ bookingId }) => {
    const dispatch = useDispatch();
    const { closeModal} = useModal();
    const cancelBooking = async (e) => {
        await dispatch(thunkDeleteBooking(bookingId))
        closeModal();
    }

    return (
        <div className='deletePrompt'>
            <form>
                <h1>Cancel booking</h1>
                <div style={{ background: 'white', padding: '10px' }}>
                    <h3 className='textmark'>Are you sure you want to cancel this booking?</h3>
                    <p style={{ textAlign: 'center' }}>Cancellation fees may apply</p>
                    <button className='deleteButton yes' autoFocus onClick={(e) => cancelBooking(e)}>{'Yes, (Cancel Booking)'}</button>
                    <button className='deleteButton no' onClick={() => closeModal()}>{'No, (Keep Booking)'}</button>
                </div>
            </form>
        </div>
    )
}
export default CancelPrompt;
