import { useDispatch } from "react-redux";
import { csrfFetch } from "./csrf";



const LOAD_SPOT = 'api/getSpot';
const GET_SINGLE_SPOT = 'api/getSingleSpot'
const CREATE_SPOT = 'api/spots/create'
const LOAD_USER_SPOT = 'api/spots/current'
const UPDATE_SPOT = 'api/spots/update'
const DELETE_SPOT = 'api/spots/remove'

const loadSpots = (spots) => {
    // console.log(spots)
    return {
        type: LOAD_SPOT,
        spots
    }
}

const loadUserSpots = (spots) => {
    return {
        type: LOAD_USER_SPOT,
        spots
    }
}

const getSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    }
}

const makeSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

const editSingleSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

const deleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}


export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')
    const data = await response.json();
    const spots = data.Spots;
    // console.log(spots)
    dispatch(loadSpots(spots))
    return spots
}

export const fetchSingleSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`);
    const data = await response.json();
    // console.log(data)
    dispatch(getSingleSpot(data))
    return data
}

export const fetchUserSpots = () => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/current`)
    const data = await response.json();
    // console.log(data)
    dispatch(loadUserSpots(data))
    return data
}


export const createSpot = (spot) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch("/api/spots", {
        method: "POST",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    })
    // console.log(response)
    const data = await response.json();
    // console.log(data)
    dispatch(makeSpot(data))
    return data
}

export const removeSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE"
    })

    const data = await response.json();
    // console.log(data)
    dispatch(deleteSpot(spotId))
    return data
}

export const updateSpot = (spot, spotId) => async (dispatch) => {
    const { address, city, state, country, lat, lng, name, description, price } = spot;
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: "PUT",
        body: JSON.stringify({
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    })
    const data = await response.json()
    dispatch(editSingleSpot(data))
    return data
}

const initalState = { spots: [], owned: {} }


const spotReducer = (state = initalState, action) => {
    let newState = state;
    switch (action.type) {
        case LOAD_SPOT:
            // console.log("We hit something")
            // console.log(action.spots)
            return { ...state, spots: [...action.spots] }
        case GET_SINGLE_SPOT:
            // newState = state
            // console.log(newState)
            return { ...newState, spot: action.spot }
        case CREATE_SPOT:
            return { ...newState, spots: [...state.spots, action.spot] }
        case LOAD_USER_SPOT:
            return { ...newState, owned: action.spots }
        case UPDATE_SPOT:
            const index = newState.spots.findIndex(spot => spot.id === action.spot.id)
            // console.log(action.spot)
            newState.spots[index] = action.spot;
            return { ...newState }
        case DELETE_SPOT:
            const spotId = action.spotId
            const updatedSpots = newState.spots.filter(spot => spot.id !== spotId);
            return { ...newState, spots: updatedSpots }
        default:
            return state;
    }
}

export default spotReducer
