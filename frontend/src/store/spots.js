import { useDispatch } from "react-redux";



const LOAD_SPOT = 'api/getSpot';
const GET_SINGLE_SPOT = 'api/getSingleSpot'

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

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    const data = await response.json();
    const spots = data.Spots;
    // console.log(spots)
    dispatch(loadSpots(spots))
    return
}

export const fetchSingleSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);
    const data = await response.json();
    console.log(data)
    dispatch(getSingleSpot(data))
    return
}

const initalState = { spots: [] }


const spotReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT:
            // console.log("We hit something")
            // console.log(action.spots)
            return { ...state, spots: [...action.spots] }
        case GET_SINGLE_SPOT:
            newState = state
            console.log(newState)
            return { ...newState, spot: action.spot }
        default:
            return state;
    }
}

export default spotReducer
