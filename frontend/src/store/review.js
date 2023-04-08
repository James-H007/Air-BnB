
const LOAD_REVIEW_SINGLE = '/api/spots/:spotId/reviews'
const LOAD_REVIEWS = '/api/reviews'

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

export const fetchReviews = () => async (dispatch) => {
    const response = await fetch('/api/reviews')
    const data = await response.json();
    dispatch(loadReviews(data))
    return
}

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    console.log(response)
    const data = await response.json();
    console.log(data)
    dispatch(loadSpotReviews(data))
    return data
}

const initialState = { reviews: [] }

const reviewReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case LOAD_REVIEW_SINGLE:
            return { ...newState, reviews: action.reviews }
        default:
            return state;
    }
}

export default reviewReducer;
