import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserSpots } from "../../store/spots";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip"
import "./manageSpot.css"



function ManageSpots() {
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState();


    const spots = useSelector(state => state.spot.owned?.Spots) //Optional chaining stops app from breaking




    useEffect(() => {
        dispatch(fetchUserSpots())

    }, [dispatch])

    if (!spots) {
        return <div>Loading...</div>;
    }


    return spots && (
        <>
            {spots && <div className="entire-page">
                <div className="titles">
                    Manage Spots
                    <NavLink to="/spots/create"><button className="new-spot">Create a New Spot</button></NavLink>
                </div>
                <div>
                    <div className="container">

                        {spots.map(({ id, name, previewImage, city, state, avgRating, price }) => (
                            <li className="major-spot-container" key={id}>

                                <NavLink to={`/spots/${id}`} >

                                    <Tooltip id={id} className="tooltip" />
                                    <div className="spot-container" data-tip={name}>
                                        <img src={previewImage} alt={name} className="preview-image" data-tooltip-id={id} data-tooltip-content={name} />

                                    </div>
                                    <div className="spot-info">
                                        <li className="spot-text">
                                            {city}, {state}
                                        </li>
                                        <li className="star-rating">
                                            ⭐{avgRating ? avgRating.toFixed(2) : "New"}
                                        </li>
                                    </div>
                                    <li>
                                        ${price} night
                                    </li>
                                </NavLink>
                                <div className="tech-buttons">
                                    <NavLink to={`/spots/${id}/edit`}><button className="tech-btn">Update</button></NavLink>
                                    <button className="tech-btn">Delete</button>
                                </div>
                            </li>
                        ))}

                    </div>
                </div>
            </div>
            }
        </>

    )
}

export default ManageSpots
