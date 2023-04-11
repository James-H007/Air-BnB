
import { useDispatch } from 'react-redux';
import './createSpot.css'
import { useDebugValue, useState } from 'react';
import * as spotActions from "../../store/spots"

function CreateSpot() {
    const dispatch = useDispatch()
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(spotActions.createSpot({ address, city, state, country, lat, lng, name, description, price }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
    }

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
                        placeholder='Address'
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
                    <h4>Mention the best features of your space, any special amenities</h4>
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
                    <h4>Catch guests' attention with a spot title that highlights what makes your place special</h4>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        className='spot-input'
                        placeholder='Name your Spot'
                    />
                    <div className='spacers'></div>
                    <h3>Set a base price for your spot</h3>
                    <h4>Catch guests' attention with a spot title that highlights what makes your place special</h4>
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
                </form>
            </div>
        </>
    )
}

export default CreateSpot
