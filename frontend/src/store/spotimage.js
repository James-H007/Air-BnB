
import { csrfFetch } from "./csrf"

const CREATE_SPOT_IMAGE = 'api/spots/:spotId/image'

const addSpotImage = (image) => {
    return {
        type: CREATE_SPOT_IMAGE,
        image
    }
}

export const addImage = (image, spotId) => async (dispatch) => {
    const { url, preview } = image;
    // console.log(image)
    // console.log(spotId)
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify({
            url,
            preview
        })
    })

    const data = await response.json();
    // console.log(data)
    dispatch(addSpotImage(data))
    return data
}

const initialState = { spotImages: [] }

const spotImageReducer = (state = initialState, action) => {
    let newState = state;
    switch (action.type) {
        case CREATE_SPOT_IMAGE:
            const newImage = action.image
            return { ...newState, spotImages: [...newState.spotImages, newImage] }
        default:
            return newState
    }
}

export default spotImageReducer
