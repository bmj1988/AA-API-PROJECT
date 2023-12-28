// import { useEffect } from "react"
import SingleBooking from "./SingleBooking"
import { useSelector } from "react-redux"
// import { thunkSpotById } from "../../store/spots";

const SpotBookingSection = ({ spotBookings }) => {
    const bookingArray = Object.values(spotBookings)
    const spotId = bookingArray[0].spotId
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
