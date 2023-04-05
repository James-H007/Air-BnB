import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, NavLink } from "react-router-dom";
import { fetchSpots } from "../../store/spots";
import './spots.css'

const SpotList = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => state.spot.spots)


    // console.log(spots);
    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])





    return (
        <div className="container">
            <ul>
                {spots.map(({ id, name, previewImage, city, state }) => (
                    <li key={id}>
                        <div>
                            <NavLink to={`/spots/${id}`}>
                                <div className="spot-container">
                                    <div className="preview-image">
                                        <img src={previewImage} alt={name} />
                                    </div>
                                    {city}, {state}
                                </div>
                            </NavLink>
                        </div>
                    </li>
                ))}
            </ul>
            Spots
        </div>
    )
}

export default SpotList
