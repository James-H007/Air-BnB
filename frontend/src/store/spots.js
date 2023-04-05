import { useDispatch } from "react-redux";



const LOAD_SPOT = 'api/getSpot';

const loadSpots = (spots) => {
    console.log(spots)
    return {
        type: LOAD_SPOT,
        spots
    }
}

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots')
    const data = await response.json();
    const spots = data.Spots;
    console.log(spots)
    dispatch(loadSpots(spots))
}

const initalState = { spots: [] }


const spotReducer = (state = initalState, action) => {
    let newState;
    switch (action.type) {
        case LOAD_SPOT:
            console.log("We hit something")
            console.log(action.spots)
            return { ...state, spots: [...action.spots] }
        default:
            return state;
    }
}

export default spotReducer
