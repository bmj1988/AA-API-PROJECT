import './SpotModal.css'
import Flatpickr from 'react-flatpickr'
import { useState, useRef, useEffect } from 'react';
import { csrfFetch } from '../../../store/crsf';
import { useDispatch, useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { loadStayDates } from '../../../store/stay';
import { useModal } from '../../../context/Modal';
import { parseBookingDate } from '../../../store/bookings';

const DateChecker = ({ spotId, bookingId }) => {
    const dispatch = useDispatch();
    const stayState = useSelector((state) => state.stay)
    const [startDate, setStartDate] = useState(stayState?.startDate || new Date());
    const [endDate, setEndDate] = useState(stayState?.endDate || new Date());
    const [loading, setLoading] = useState(false);
    const [available, setAvailable] = useState(null)
    const { closeModal } = useModal();
    const fp = useRef(null)

    useEffect(() => {
        dispatch(loadStayDates([startDate, endDate]))
    }, [startDate, endDate, dispatch])

    const checkAvailability = async (e) => {

        ///using for initial booking

        if (spotId && !bookingId) {
            try {
                setLoading(true);
                e.preventDefault();
                const testDate = {
                    startDate,
                    endDate
                }

                const response = await csrfFetch(`/api/spots/${spotId}/availability`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(testDate)

                })
                if (response.ok) {
                    console.log(startDate, endDate)
                    setLoading(false)
                    setAvailable(true)
                }
            }

            catch (e) {
                setLoading(false)
                setAvailable(false)
            }
        }

        /// Using for editing booking

        if (!spotId && bookingId) {
            try {
                setLoading(true);
                e.preventDefault();
                const testDate = {
                    startDate: await parseBookingDate(startDate),
                    endDate: await parseBookingDate(endDate),
                }
                console.log(testDate)
                const response = await csrfFetch(`/api/bookings/${bookingId}/availability`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(testDate)

                })
                if (response.ok) {
                    setLoading(false)
                    setAvailable(true)
                }
            }

            catch (e) {
                setLoading(false)
                setAvailable(false)
            }
        }
    }

    const createBooking = () => {
        closeModal();
        return
    }

    return (
        <div className='datePicker' id='dateDiv'>
            <h1>Check availability</h1>

            <div className={'aForm'}>
                <div>
                    {available === true && <h3 style={{ color: 'green' }}>Your requested dates are available</h3>}
                    {available === false && <h3 className='errors'>Your requested dates are unavailable</h3>}
                    <Flatpickr className={'dateBox textmark'} ref={fp} placeholder='Select dates...'
                        options={{
                            minDate: new Date(),
                            maxDate: '2030-01-01',
                            mode: 'range',
                            altInput: true,
                            altFormat: 'F j, Y',
                            dateFormat: 'Y-m-d',
                            defaultDate: [startDate, endDate],




                        }}
                        onChange={() => setAvailable(null)}
                        onValueUpdate={(selectedDates) => {
                            setStartDate(selectedDates[0]);
                            setEndDate(selectedDates[1]);
                        }}
                    />
                </div>
                {loading && <ThreeDots color='#1bcdd0' />}

                <div className='dateCheckButtonDiv'>
                    <button className='dateCheckButton textmark' name='check-avail' onClick={(e) => checkAvailability(e)}>Check availability</button>
                    <button className='clearbutton textmark' name='clear-cal'
                        onClick={(e) => {
                            e.preventDefault();
                            if (!fp?.current?.flatpickr) return;
                            fp.current.flatpickr.clear();
                        }}
                    >
                        Clear
                    </button>
                    <button onClick={(e) => createBooking(e)} name='create-booking' disabled={available !== true} >Accept Dates</button>
                </div>
            </div>

        </div>
    )
}

export default DateChecker;
