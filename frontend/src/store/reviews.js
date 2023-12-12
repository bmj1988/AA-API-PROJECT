import { csrfFetch } from "./crsf"
import { createSelector } from "reselect"

/// ACTION TYPES
const LOADREVIEWS = 'reviews/LOAD'
const ADDREVIEW = 'reviews/ADD'


/// ACTION CREATORS

const loadReviews = (reviews) => {
   return  {
        type: LOADREVIEWS,
        reviews
    }
}

const addReview = (review) => {
    return {
        type: ADDREVIEW,
        review
    }
}

/// SELECTORS

export const reviewsArray = createSelector((state) => state.reviews, (reviews) => {
    return Object.values(reviews)
})

/// THUNKS

export const thunkReviewsBySpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if (response.ok) {
        const reviews = await response.json();
        await dispatch(loadReviews(reviews))
        return reviews
    }
}

/// REDUCER

export const reviewReducer = (state = {}, action) => {
    let reviewState = {...state}
    switch (action.type) {
        case LOADREVIEWS: {
            reviewState = {}
            action.reviews.forEach((review) => {
                reviewState[review.id] = review;
            })
            return reviewState;
        }
        default: {
            return reviewState;
        }
    }
}
