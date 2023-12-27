import { useEffect, useRef, useState } from "react";
import { loadStayDates } from "../../store/stay";
import { useDispatch } from "react-redux";
import Flatpickr from 'react-flatpickr'
import { csrfFetch } from "../../store/crsf";
import { thunkDateCheckerDisabledList } from "../../store/bookings";

const InPageDatePicker = ({ spotId }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [disabledList, setDisabledList] = useState([{}])
    const dispatch = useDispatch();
    const dateRef = useRef(null)
    useEffect(() => {
        console.log(startDate, endDate, `This is how many times useEffect will run`)
        dispatch(loadStayDates([startDate, endDate]))
    }, [startDate, endDate, dispatch])
    useEffect(() => {
        const fastChecker = async () => {
            const dates = await thunkDateCheckerDisabledList(spotId)
            const formattedDates = []
            for (let date of dates) {
                const newDate = {}
                newDate.from = date.startDate
                newDate.to = date.endDate
                formattedDates.push(newDate)
                console.log(formattedDates)
            }
            setDisabledList(formattedDates)
        }
        fastChecker();
        console.log(`disabled thunk ran`, disabledList)
    }, [dispatch, spotId])
    // const spotBookings = csrfFetch(`/api/spots/${spotId}/bookings`).then((data) => data.json()).then((data) => console.log(`Spot bookings`, data.Bookings))


    return (
        <div className={'reserveDiv'}>

            <Flatpickr className={'dateBox textmark'} ref={dateRef} placeholder='Select dates...'
                options={{
                    minDate: new Date(),
                    maxDate: '2030-01-01',
                    mode: 'range',
                    altInput: true,
                    altFormat: 'F j, Y',
                    dateFormat: 'Y-m-d',
                    inline: true,
                    disable: disabledList



                }}

                onValueUpdate={(selectedDates, dateStr, instance) => {
                    if (selectedDates.length === 2) {
                        setStartDate(selectedDates[0])
                        setEndDate(selectedDates[1])
                    }
                }}
            />
        </div>
    )
}
export default InPageDatePicker
