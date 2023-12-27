// import { useEffect } from "react"
import SingleBooking from "./SingleBooking"
import { useDispatch, useSelector } from "react-redux"
// import { thunkSpotById } from "../../store/spots";

const SpotBookingSection = ({ spotBookings }) => {
    const dispatch = useDispatch();
    const bookingArray = Object.values(spotBookings)
    const spotId = bookingArray[0].spotId
    // useEffect(() => {
    //     dispatch(thunkSpotById(spotId))
    // }, [dispatch, spotId])
    const spot = useSelector((state) => state.spots[spotId])

    return (
        <div className="textmark">
            <h3>{`${spot.name} | ${spot.address}, ${spot.city}, ${spot.state}, ${spot.country}`}</h3>
            {spotBookings && bookingArray.map((booking) => {
                return <SingleBooking key={booking.id} booking={booking} spot={spot} />
            })}
        </div>
    )
}
export default SpotBookingSection
