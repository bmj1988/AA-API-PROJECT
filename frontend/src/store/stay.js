import { createSelector } from "reselect";

/// ACTION TYPES

const LOADSTAY = 'stay/LOAD';

/// ACTION CREATORS

export const loadStayDates = (stayDates) => {
    return (
        {
            type: LOADSTAY,
            stayDates
        }
    )
}

/// SELECTORS

export const datesArray = createSelector((state) => state.stay, (dates) => {

    return Object.values(dates)
})

/// REDUCER

export const stayReducer = (state = {}, action) => {
    let stayState = { ...state }
    switch (action.type) {
        case LOADSTAY: {
            stayState.startDate = action.stayDates[0]
            stayState.endDate = action.stayDates[1]
            return stayState
        }
        default: {
            return stayState
        }
    }
}
