import { useLocation, useNavigate, useParams } from "react-router-dom";
import './booking.css'
import { useSelector } from "react-redux";
import OpenModalSpan from "./OpenModalSpan";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import PaymentInputs from "./PaymentInputs";
import DateChecker from "../Main/SpotModal/DateChecker";
import { useEffect, useState } from "react";
import { createBooking, parseBookingDate } from "../../store/bookings";

const BookingPage = () => {
    const { state } = useLocation();
    let { spotId } = useParams();
    const navigate = useNavigate();
    let user = useSelector((state) => state.session?.user)
    const [startDate, setStartDate] = useState(state?.stay?.startDate)
    const [endDate, setEndDate] = useState(state?.stay?.endDate)
    const [created, setCreated] = useState(false)
    const [errors, setErrors] = useState(null)
    const start = useSelector((state) => state.stay?.startDate)
    const end = useSelector((state) => state.stay?.endDate)


    useEffect(() => {
        if (start) setStartDate(start)
        if (end) setEndDate(end)
    }, [start, end])

    const option = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    const book = async (e) => {
        e.preventDefault();
        const booking = {
            startDate: await parseBookingDate(startDate),
            endDate: await parseBookingDate(endDate)
        }
        try {
            const response = await createBooking(booking, spotId)
            console.log(`RESPONSE HERE`, response)
            setCreated(true)
        }
        catch (e) {
            console.log(e, `ERRORS`)
            let errorMessage = await e.json()
            if (errorMessage.errors) setErrors(errorMessage.errors)
            console.log(errorMessage)
            return
        }
    }

    if (!created) return (
        <div className='bookingMain'>
            <h1 className="textmark">Complete your booking</h1>
            {state.booking && <div name='dates'>
                <h2 className="textmark">Dates of your stay</h2>
                <p className="standardP textmark">Arrival: {startDate?.toLocaleDateString('en-US', option) || `Not specified`} <OpenModalSpan spanText={'Edit'} modalComponent={<DateChecker spotId={spotId} />} /></p>
                <p className="standardP textmark">Departure: {endDate?.toLocaleDateString('en-US', option) || `Not specified`} <OpenModalSpan spanText={'Edit'} modalComponent={<DateChecker spotId={spotId} />} /></p>
            </div>}
            {user && <div name='payment'>
                <h2>Payment Information</h2>
                <PaymentInputs />

            </div>}
            {!user && <div name='login'>
                <p className="textmark standardP">Please <OpenModalSpan spanText='login' modalComponent={<LoginFormModal />} /> to complete booking.</p>
                <p className="textmark standardP">{` Don&apos;t have an account? `}<OpenModalSpan spanText='Sign up here.' modalComponent={<SignupFormModal />} /></p>
            </div>
            }
            {errors && Object.values(errors).length && Object.values(errors).map((error) => {
                return <p key={error} className='errors'>{error}</p>
            })}
            <button className="reserveButton" onClick={(e) => book(e)}>Confirm booking</button>
        </div>
    )

    if (created) return (
        <div>
            <h1 className="textmark">Success!</h1>
            <p className="standardP textmark">Your booking was successfully created. Enjoy your stay!</p>
            <p className="standardP textmark"><span style={{ textDecoration: 'underline #1bcdd0', cursor: 'pointer' }} onClick={() => navigate('/')}>Return to our homepage</span> or <span style={{ textDecoration: 'underline #1bcdd0', cursor: 'pointer' }} onClick={() => navigate('/bookings')}>Manage your bookings</span></p>
        </div>
    )
}
export default BookingPage;
