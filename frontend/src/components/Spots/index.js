import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import './spots.css'
import { Tooltip } from "react-tooltip"
import 'react-tooltip/dist/react-tooltip.css'

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot.spots)
    console.log(spots)

    // console.log(spots);
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])





    return (
        <div className="container">

            {spots.map(({ id, name, previewImage, city, state, avgRating, price }) => (
                <li className="major-spot-container" key={id}>

                    <Link to={`/spots/${id}`} >

                        <Tooltip id={id} className="tooltip" />
                        <div className="spot-container" data-tip={name}>
                            <img src={previewImage} alt={name} className="preview-image" data-tooltip-id={id} data-tooltip-content={name} />

                        </div>
                        <div className="spot-info">
                            <li className="spot-text">
                                {city}, {state}
                            </li>
                            <li className="star-rating">
                                ⭐{avgRating ? avgRating : "New"}
                            </li>
                        </div>
                        <li>
                            ${price} night
                        </li>
                    </Link>

                </li>
            ))}
        </div>
    )
}

export default SpotList
