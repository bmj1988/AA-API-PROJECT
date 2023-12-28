import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { spotBookingsMainArray, thunkManageBookings, userBookings } from "../../store/bookings"
import SingleStay from "./SingleStay"
import { useNavigate } from "react-router-dom"
import SpotBookingSection from "./SpotBookingSection"

const ManageBookings = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reservations = useSelector(userBookings)
    const spotReservations = useSelector(spotBookingsMainArray)

    useEffect(() => {
        dispatch(thunkManageBookings())
    }, [dispatch])


    return (
        <div className="mainBookingDiv">
            <h1>Manage your bookings</h1>
            <div>
                <h2>Manage bookings for your spots</h2>
                <div className="bookingContentDiv">
                    {spotReservations.length > 0 && spotReservations.map((singleSpotsBookings) => {
                        return <SpotBookingSection key={Object.values(singleSpotsBookings)[0].id} spotBookings={singleSpotsBookings} />
                    })}
                    {spotReservations.length < 1 && <p>You have no reservations booked at your spots. <span style={{ textDecoration: 'underline #1bcdd0', cursor: 'pointer' }} onClick={() => navigate('/manageSpots')}>Manage your spots!</span></p>}
                </div>
            </div>
            <div>
                <h2>Manage your stays at other spots</h2>
                <div className="bookingContentDiv">
                    {reservations.length > 0 && reservations.map((reservation) => {
                        return <SingleStay key={reservation.id} booking={reservation} />
                    })}
                    {reservations.length < 1 && <p>You have no reservations booked. <span style={{ textDecoration: 'underline #1bcdd0', cursor: 'pointer' }} onClick={() => navigate('/')}>Check out some spots!</span></p>}
                </div>
            </div>
        </div>
    )

}
export default ManageBookings;
// const spotsBookings = Object.values(store.bookings)
