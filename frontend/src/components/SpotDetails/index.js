import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchSingleSpot } from "../../store/spots";
import './spot.css'


const SpotDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    console.log(id)

    const spots = useSelector(state => state.spot)
    const selectedSpot = spots.spot;
    console.log(selectedSpot)
    const { name, address, city, state, country, price, description, avgStarRating, numReviews, SpotImages } = selectedSpot

    useEffect(() => {
        dispatch(fetchSingleSpot(id))
    }, [dispatch])

    return (
        <>
            <div className="entire-spot">
                <header>{name}</header>
                <span className="location-info">{city},{state},{country}</span>
                <div className="image-container">
                    <div>
                        <img src={SpotImages[0].url} alt="main-img" className="main-image" />
                    </div>
                </div>
            </div>
        </>
    )
}


export default SpotDetails
