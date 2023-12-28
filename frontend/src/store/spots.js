import { csrfFetch } from "./crsf"
import { createSelector } from 'reselect'

/// ACTION TYPES

const GETALLSPOTS = 'spots/GetAllSpots'
const SPOTDETAILS = 'spots/SpotDetails'
const DELETESPOT = 'spots/DELETE'

///ACTION CREATORS

const getAllSpots = (spots) => {
    return (
        {
            type: GETALLSPOTS,
            spots
        }
    )
}

const getSpotDetails = (details) => {
    return (
        {
            type: SPOTDETAILS,
            details,
        }
    )
}

const deleteSpot = (spotId) => {
    return ({
        type: DELETESPOT,
        spotId
    })
}

/// THUNKS

export const thunkAllSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/spots')
        if (response.ok) {
            const spots = await response.json();
            dispatch(getAllSpots(spots));
            return spots
        }
    }
    catch (e) {
        return e
    }

}

export const thunkSpotById = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${id}`)
        if (response.ok) {
            const spotDetails = await response.json();
            dispatch(getSpotDetails(spotDetails))
            return spotDetails
        }
    }
    catch (e) {
        return e
    }

}

export const thunkCreateSpot = (spotDetails, images) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spotDetails)
        })
        if (response.ok) {
            const newSpot = await response.json();
            if (Object.values(images).length > 0) {
                for (let image in images) {
                    const imageUrl = images[image]
                    fetchCreateImagesForSpot(imageUrl, newSpot.id)
                }
            }
            await dispatch(thunkSpotById(newSpot.id))
            return newSpot
        }
    }
    catch (e) {
        const error = await e.json();
        return error
    }
}

export const thunkGetOwnSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/current`)
        if (response.ok) {
            const ownSpots = await response.json();
            dispatch(getAllSpots(ownSpots));
            return ownSpots;
        }
    }
    catch (e) {
        return e
    }
}

export const thunkSpotDelete = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            const success = await response.json()
            dispatch(deleteSpot(spotId))
            return success
        }
    }
    catch (e) {
        const error = e.json();
        return error
    }
}

export const thunkSpotUpdate = (spot, spotId, images) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(spot)
        })
        if (response.ok) {
            const updatedSpot = await response.json();
            if (Object.values(images).length > 0) {
                for (let image in images) {
                    const imageUrl = images[image]
                    fetchCreateImagesForSpot(imageUrl, updatedSpot.id)
                }
            }
            await dispatch(thunkSpotById(updatedSpot.id));
            return updatedSpot;
        }
    }
    catch (e) {
        const errors = await e.json()
        return errors
    }
}

export const thunkDeleteSpotImage = (imageId, spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spot-images/${imageId}`, {
            method: 'DELETE'
        })
        if (response.ok) {
            dispatch(thunkSpotById(spotId))
            return
        }
    } catch (e) {
        console.log(e)
        return (e)
    }
}

export const thunkSpotSearch = async (params) => {
    try {const response = await csrfFetch(`api/spots?${params}`)
    if (response.ok) {
        const searchedSpots = await response.json()
        return searchedSpots
    }}
    catch (e) {
        console.log(e)
        return (e)
    }
}

/// SELECTORS

export const spotsArray = createSelector((state) => state.spots, (spots) => {
    return Object.values(spots)
})


/// REDUCER

export const spotsReducer = (state = {}, action) => {
    let spotState = { ...state }
    switch (action.type) {
        case GETALLSPOTS: {
            spotState = {};
            action.spots.Spots.forEach((spot) => spotState[spot.id] = spot)
            return spotState;
        }
        case SPOTDETAILS: {
            delete spotState[action.details.id]
            spotState[action.details.id] = action.details
            return spotState
        }
        case DELETESPOT: {
            delete spotState[action.spotId]
            return spotState
        }
        default: {
            return spotState
        }

    }
}


/// MISC HELPER FUNCTIONS
const fetchCreateImagesForSpot = async (image, spotId) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: image, preview: false })
        })
        if (response.ok) {
            return
        }
    }
    catch (e) {
        return (e)
    }
}
