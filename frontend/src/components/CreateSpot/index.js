
import { useDispatch, useSelector } from 'react-redux';
import './createSpot.css'
import { useState } from 'react';
import * as spotActions from "../../store/spots"
import * as spotImageActions from "../../store/spotimage"
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function CreateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const placeholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState({})
    const [previewImg, setPreviewImg] = useState({ url: placeholder, preview: true })
    // const [firstImg, setFirstImg] = useState({ preview: false })



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        try {
            const newSpot = await dispatch(spotActions.createSpot({ address, city, state, country, lat, lng, name, description, price }));
            const { id } = newSpot;
            console.log(id)
            console.log(newSpot);
            await dispatch(spotImageActions.addImage(previewImg, id))
            history.push(`/spots/${id}`);
            // or if the URL does not include the prefix /spots, use the following line instead
            // history.push(`/path-to-new-spot/${id}`);
        } catch (err) {
            console.log(err);
            setErrors(['An error occurred. Please try again.']);
        }
    };


    return (
        <>
            <div className='entire-spot-creation'>
                <div className='spot-creation-start'>
                    <h2>Create a New Spot</h2>
                    <h3>Where's your place located?</h3>
                    <h4>Guests will only get your exact address once they booked a reservation</h4>
                </div>

                <form onSubmit={handleSubmit} className='spot-form'>
                    <ul className='errors'>
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label className='spot-text'>
                        Country
                    </label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className='spot-input'
                        placeholder='Country'
                    />

                    <label className='spot-text'>
                        Street Address
                    </label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                        className='spot-input'
                        placeholder='Street Address'
                    />

                    <div className='city-state'>
                        <label className='spot-text'>
                            City
                        </label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className='spot-input'
                            placeholder='City'
                        />
                        <label className='spot-text'>
                            State
                        </label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                            className='spot-input'
                            placeholder='State'
                        />
                    </div>
                    <div className='spacers'></div>

                    <h3>Describe your place to guests</h3>
                    <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <textarea
                        rows={4}
                        cols={50}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        placeholder='Please write at least 30 characters'
                        className='spot-text-box'
                    />

                    <div className='spacers'></div>
                    <h3>Create a title for your spot</h3>
                    <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
                    <input
                        type='text'
                        value={name}
                        required
                        onChange={(e) => { setName(e.target.value) }}
                        className='spot-input'
                        placeholder='Name of your spot'
                    />
                    <div className='spacers'></div>
                    <h3>Set a base price for your spot</h3>
                    <h4>Competitive pricing can help your listing stand out and rank higher in search results.</h4>
                    <div className='price-form'>
                        <div className='dollar'>$</div>
                        <input
                            type='text'
                            value={price}
                            onChange={(e) => { setPrice(e.target.value) }}
                            className='spot-input'
                            placeholder='Price per night (USD)'
                        />
                    </div>
                    <div className='spacers'></div>
                    <h3>Liven up your spot with photos</h3>
                    <h4>Submit a link to at least one photo to publish your spot</h4>

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Preview Image URL'
                        required
                    />

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                    />

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                    />

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                    />

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                    />
                    <div className='spacers'></div>

                    <div className='button-container'>
                        <button type="submit" className="spot-button" disabled={Object.values(validationErrors).length > 0}>Create Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CreateSpot
