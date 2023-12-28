import { createSelector } from "reselect";
import { csrfFetch } from "./crsf";
import { thunkGetOwnSpots } from "./spots";

/// ACTION TYPES

const ADDBOOKINGS = 'bookings/ADD';
const ADDUSERBOOKINGS = 'user/Booking/ADD';
const DELETEUSERBOOKING = 'user/Booking/DEL';

/// ACTION CREATORS



export const addBookings = (spotId, bookingArray) => {
    return (
        {
            type: ADDBOOKINGS,
            bookingArray,
            spotId
        }
    )
}

export const addUserBookings = (bookings) => {
    return (
        {
            type: ADDUSERBOOKINGS,
            bookings

        }
    )
}

const deleteUserBooking = (bookingId) => {
    return (
        {
            type: DELETEUSERBOOKING,
            bookingId
        }
    )
}

/// THUNKS

export const thunkDateCheckerDisabledList = async (spotId) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
        if (response.ok) {
            const spotBookings = await response.json()
            return spotBookings.Bookings
        }
        else {
            const error = await response.json();
            return error
        }
    }
    catch (e) {
        console.log(e)
    }
}

export const thunkGetBookingsBySpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const spotBookings = await response.json()
        if (spotBookings.Bookings.length > 0) dispatch(addBookings(spotId, spotBookings.Bookings))
        return spotBookings
    }
    else {
        const error = response.json();
        return error
    }
}

export const thunkGetUserBookings = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/bookings/current`)
        if (response.ok) {
            const userBookings = await response.json();
            console.log(`user bookings returns true`, userBookings)
            dispatch(addUserBookings(userBookings.Bookings))
            return
        }
    }
    catch (e) {
        console.log(`ERROR ON USER BOOKINGS`, e)
        return
    }
}

export const thunkDeleteBooking = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        dispatch(deleteUserBooking(bookingId))
        return
    }
}

export const thunkManageBookings = () => async (dispatch) => {

    try {
        dispatch(thunkGetOwnSpots())
            .then((data) => data.Spots)
            .then((array) => array.forEach((spot) => dispatch(thunkGetBookingsBySpot(spot.id))))
            .then(() => dispatch(thunkGetUserBookings()))
    }
    catch (e) {
        return (e)
    }
}


/// FUNCTIONS

export const editBookingFetch = async (booking) => {
    const response = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ startDate: booking.startDate, endDate: booking.endDate })
    })
    if (response.ok) {
        return { message: 'Booking successfully edited' }
    }
    else {
        const error = await response.json();
        return error
    }
}

export const createBooking = async (booking, spotId) => {
    const result = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...booking })
    })
    if (result.ok) {
        const response = await result.json();
        return response
    }
    else {
        const error = await result.json();
        return error
    }

}

export const parseBookingDate = async (date) => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${Number(year)}-${Number(month) + 1}-${Number(day)}`
}

/// SELECTORS

export const userBookings = createSelector((state) => state.bookings?.User, (userBookings) => {
    if (userBookings) return Object.values(userBookings)
    else return []
})

export const spotBookingsMainArray = createSelector((state) => state.bookings?.Spot, (spotBookings) => {
    if (spotBookings) return Object.values(spotBookings)
    else return []
})

// const spotBookingsSelector = createSelector((state) => state.bookings.Spot, (bookingsIndex) => {
//     for (let spotBookings in bookingsIndex) {
//         let bookingValues = Object.values(spotBookings) /// 1: [bookingObject, bookingObject] state.bookings.Spot.1(spotId).1(bookingId) = values
//         return (
//             {
//                 booking.Values.map((booking) => {
//                     return (
//                         <div>

//                         </div>
//                     )
//                 })
//             }
//         )
//     }
// })

/// REDUCER

export const bookingReducer = (state = {}, action) => {
    let bookingState = { ...state }
    switch (action.type) {
        case ADDBOOKINGS: {
            bookingState['Spot'] = { ...state?.Spot }
            action.bookingArray.forEach((bookingObject) => {
                bookingState.Spot[action.spotId] = {}
                bookingState.Spot[action.spotId][bookingObject.id] = bookingObject
            })
            return bookingState
        }
        case ADDUSERBOOKINGS: {
            bookingState['User'] = {}
            action.bookings.forEach((booking) => bookingState.User[booking.id] = booking)
            return bookingState
        }
        case DELETEUSERBOOKING: {
            delete bookingState.User[action.bookingId]
            return bookingState
        }
        default: {
            return bookingState
        }
    }
}
