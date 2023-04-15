import { csrfFetch } from "./csrf"

const LOAD_REVIEW_SINGLE = '/api/spots/:spotId/reviews'
const LOAD_REVIEWS = '/api/reviews'
const MAKE_REVIEW = '/api/spots/:spotId/create'

const loadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

const loadSpotReviews = (reviews) => {
    return {
        type: LOAD_REVIEW_SINGLE,
        reviews
    }
}

const makeSpotReview = (review) => {
    return {
        type: MAKE_REVIEW,
        review
    }
}

export const fetchReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews')
    const data = await response.json();
    dispatch(loadReviews(data))
    return data
}

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    // console.log(response)
    const data = await response.json();
    // console.log(data)
    dispatch(loadSpotReviews(data))
    return data
}

export const createReview = (post, spotId) => async (dispatch) => {
    const { review, stars } = post;
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify({
            review,
            stars
        })
    })

    const data = await response.json()
    console.log(data)
    dispatch(makeSpotReview(data))
    return data
}

const initialState = { reviews: [] }

const reviewReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case LOAD_REVIEW_SINGLE:
            return { ...newState, reviews: action.reviews }
        case MAKE_REVIEW:
            const newReview = action.review
            console.log({ ...newState, reviews: [newReview] })
            return { ...newState, reviews: [newReview] }
        default:
            return state;
    }
}

export default reviewReducer;
