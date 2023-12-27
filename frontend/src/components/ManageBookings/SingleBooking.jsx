import './managebookings.css'

const SingleBooking = ({ booking, spot }) => {
    const createdAtDate = new Date(booking?.createdAt).toLocaleDateString()

    return (
        <div className="singleStayContainer grayBG">
            <div className='bookingInfo'>
                <div className='cell'>
                    <p> Guest name: </p><p>{`${booking?.User.firstName} ${booking?.User.lastName}`}</p>
                </div>
                <div className='cell'>
                    <p>Guest Arrival:</p><p>{booking?.startDate}</p>
                </div>
                <div className='cell'>
                    <p>Guest Departure:</p><p>{booking?.endDate}</p>
                </div>
                <div className='cell'>
                    <p>Date booked:</p><p>{createdAtDate}</p>
                </div>
            </div>
        </div>
    )
}
export default SingleBooking;
