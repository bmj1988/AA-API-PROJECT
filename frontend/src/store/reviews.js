import { csrfFetch } from "./crsf"
import { createSelector } from "reselect"
import { thunkSpotById } from "./spots"

/// ACTION TYPES
const LOADREVIEWS = 'reviews/LOAD'
const DELETEREVIEW = 'reviews/DEL'
const EDITREVIEW = 'reviews/EDIT'
// const LOADUSERREVIEWS = 'reviews/user/LOAD'


/// ACTION CREATORS
// const loadUserReviews = (reviews) => {
//     return ({
//         type: LOADUSERREVIEWS,
//         reviews : reviews
//     })
// }

const loadReviews = (reviews) => {
    return {
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

const editReview = (review) => {
    return {
        type: EDITREVIEW,
        review
    }
}

/// SELECTORS

export const reviewsArray = createSelector((state) => state.reviews, (reviews) => {
    return Object.values(reviews).sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
    })
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
        dispatch(thunkSpotById(review.spotId))
        return newReview
    }
    else {
        const error = await response.json()
        return error
    }
}

export const thunkDeleteReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const success = await response.json()
        dispatch(deleteReview(review.id))
        dispatch(thunkSpotById(review.spotId))
        return success.message
    }
    else {
        const error = await response.json();
        return error
    }
}

export const thunkGetUserReviews = () => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/current`)
    if (response.ok) {
        const userReviews = await response.json();
        dispatch(loadReviews(userReviews))
        return
    }
}

export const thunkEditReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({review: review.review, stars: review.stars})
    })
    if (response.ok) {
        const review = await response.json();
        dispatch(editReview(review))
        return review
    }
    else {
        const errors = await response.json()
        return errors
    }
}

/// REDUCER

export const reviewReducer = (state = {}, action) => {
    let reviewState = { ...state }
    switch (action.type) {
        case LOADREVIEWS: {
            reviewState = {}
            action.reviews.Reviews.forEach((review) => {
                reviewState[review.id] = review;
            })
            console.log(`!!!!!!!`, reviewState)
            return reviewState;
        }
        case DELETEREVIEW: {
            delete reviewState[action.reviewId]
            return reviewState;
        }
        case EDITREVIEW: {
            if (reviewState[action.review?.id]) {
                reviewState[action.review?.id].review = action.review.review
                reviewState[action.review?.id].stars = action.review.stars
            }
            return reviewState;
        }

        default: {
            return reviewState;
        }
    }
}
