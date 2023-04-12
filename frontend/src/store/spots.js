import { useDispatch } from "react-redux";
import { csrfFetch } from "./csrf";



const LOAD_SPOT = 'api/getSpot';
const GET_SINGLE_SPOT = 'api/getSingleSpot'
const CREATE_SPOT = 'api/spots/create'

const loadSpots = (spots) => {
    // console.log(spots)
    return {
        type: LOAD_SPOT,
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
    const data = await response.json();
    console.log(data)
    dispatch(makeSpot(data))
    return data
}

const initalState = { spots: [] }


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

        default:
            return state;
    }
}

export default spotReducer
