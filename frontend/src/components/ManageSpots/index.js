import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUserSpots } from "../../store/spots";
import { NavLink, Link } from "react-router-dom";
import { Tooltip } from "react-tooltip"
import "./manageSpot.css"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import SpotDelete from "./SpotDelete";



function ManageSpots() {
    const dispatch = useDispatch();
    const ulRef = useRef(); //Referes
    // const [loading, setLoading] = useState();
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);



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
                                    <button className="tech-btn"><OpenModalMenuItem
                                        itemText="Delete"
                                        onItemClick={closeMenu}
                                        modalComponent={<SpotDelete id={id} />}
                                    /></button>
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
