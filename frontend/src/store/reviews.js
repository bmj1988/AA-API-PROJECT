import { csrfFetch } from "./crsf"
import { createSelector } from "reselect"

/// ACTION TYPES
const LOADREVIEWS = 'reviews/LOAD'
const DELETEREVIEW = 'reviews/DEL'


/// ACTION CREATORS

const loadReviews = (reviews) => {
   return  {
        type: LOADREVIEWS,
        reviews
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETEREVIEW,
        reviewId
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

export const thunkAddReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${review.spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(review)

    })
    if (response.ok) {
        const newReview = await response.json();
        dispatch(thunkReviewsBySpot(review.spotId))
        return newReview
    }
    else {
        const error = await response.json()
        return error
    }
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const success = await response.json()
        dispatch(deleteReview(reviewId))
        return success.message
    }
}

export const thunkGetUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)
    if (response.ok) {
        const userReviews = await response.json();
        console.log(`USER REVIEWS HERE`, userReviews)
        await dispatch(loadReviews(userReviews))
        return
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
        case DELETEREVIEW: {
            delete reviewState[action.reviewId]
            return reviewState;
        }
        default: {
            return reviewState;
        }
    }
}
