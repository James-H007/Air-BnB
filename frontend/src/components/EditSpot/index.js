
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as spotActions from "../../store/spots"
import * as spotImageActions from "../../store/spotimage"
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import "./editSpot.css"


function EditSpot() {
    const { id } = useParams();
    const selectedSpot = useSelector(state => state.spot.spot)
    console.log(selectedSpot)
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
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState([])
    const [validationErrors, setValidationErrors] = useState({})
    const [previewImage, setPreviewImage] = useState({})
    const [imgOne, setImgOne] = useState({})
    const [imgTwo, setImgTwo] = useState({})
    const [imgThree, setImgThree] = useState({})
    const [imgFour, setImgFour] = useState({})
    const [imgCheck, setImgCheck] = useState(false)

    useEffect(() => {
        console.log("hit")
        console.log(dispatch(spotActions.fetchSingleSpot(id)))

    }, [dispatch, id])

    useEffect(() => {
        if (selectedSpot) {
            const { address, city, state, country, name, description, price } = selectedSpot;
            setName(name);
            setAddress(address)
            setCity(city)
            setState(state)
            setCountry(country)
            setPrice(price)
            setDescription(description)
        }
    }, [selectedSpot])


    const handleImageInput = (newUrl, idx) => {
        if (idx === 0) {
            setPreviewImage({ url: newUrl, preview: true })
            console.log(previewImage)
            return
        }
        else if (idx === 1) {
            setImgOne({ url: newUrl, preview: false })
            return
        }
        else if (idx === 2) {
            setImgTwo({ url: newUrl, preview: false })
            return
        }
        else if (idx === 3) {
            setImgThree({ url: newUrl, preview: false })
            return
        }
        else if (idx === 4) {
            setImgFour({ url: newUrl, preview: false })
            return
        }

    }

    const validations = () => {
        const errors = {}
        const allImages = [previewImage, imgOne, imgTwo, imgThree, imgFour]
        const validImgs = [".jpg", "jpeg", ".png"]
        // if (!previewImage.url) { errors["preview"] = "Preview image is required." }
        if (country.length === 0) { errors["country"] = "Country is required" }
        if (address.length === 0) { errors["address"] = "Address is required" }
        if (city.length === 0) { errors["city"] = "City is required" }
        if (state.length === 0) { errors["state"] = "State is required" }
        if (description.length < 30) { errors["description"] = "Description needs to be a minimum of 30 characters" }
        if (name.length === 0) { errors["name"] = "Name is required" }
        if (price.length === 0) { errors["price"] = "Price is required" }
        if (isNaN(Number(price))) { errors["price"] = "Not a valid input, please try again" }


        // for (let i = 0; i < allImages.length; i++) {
        //     let image = allImages[i]
        //     if (image.url && !validImgs.includes(image.url.slice(-4))) {
        //         errors["url"] = "Image URL must end in .png, .jpg, or jpeg"
        //     }
        // }


        // console.log(errors)

        setValidationErrors(errors)

        if (!Object.values(validationErrors).length) { setImgCheck(false) }

    }

    useEffect(() => {
        validations();
    }, [previewImage, imgOne, imgTwo, imgThree, imgFour, country, address, city, state, description, name, price])





    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        if (Object.values(validationErrors).length > 0) {
            console.log(Object.values(validationErrors).length)
            setImgCheck(true)
            return
        }

        const data = { address, city, state, country, name, description, price }

        try {
            const newSpot = await dispatch(spotActions.updateSpot(data, id));
            // const { id } = newSpot;
            // console.log(id)
            // console.log(newSpot);
            // await dispatch(spotImageActions.addImage(previewImage, id))
            // if (imgOne) await dispatch(spotImageActions.addImage(imgOne, id))
            // if (imgTwo) await dispatch(spotImageActions.addImage(imgTwo, id))
            // if (imgThree) await dispatch(spotImageActions.addImage(imgThree, id))
            // if (imgFour) await dispatch(spotImageActions.addImage(imgFour, id))

            history.push(`/spots/${id}`);
        } catch (res) {
            console.log(res)
            const data = await res.json()
            await console.log(data);
            if (data && data.errors) setErrors(data.errors);
            setImgCheck(true)
            // console.log(errors)
        }
    };

    return (
        <>
            <div className='entire-spot-creation'>
                <div className='spot-creation-start'>
                    <h2>Edit Spot</h2>
                    <h3>Where's your place located?</h3>
                    <h4>Guests will only get your exact address once they booked a reservation</h4>
                </div>

                <form onSubmit={handleSubmit} className='spot-form'>
                    {/* <ul className='errors'>
                        {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul> */}
                    <label className='spot-text'>
                        Country
                    </label>
                    {imgCheck && validationErrors.country && <p className='errors'>{validationErrors.country}</p>}
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}

                        className='spot-input'
                        placeholder='Country'
                    />

                    <label className='spot-text'>
                        Street Address
                    </label>
                    {imgCheck && validationErrors.address && <p className='errors'>{validationErrors.address}</p>}
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}

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

                            className='spot-input'
                            placeholder='City'
                        />
                        {imgCheck && validationErrors.city && <p className='errors'>{validationErrors.city}</p>}
                        <label className='spot-text'>
                            State
                        </label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}

                            className='spot-input'
                            placeholder='State'
                        />
                        {imgCheck && validationErrors.state && <p className='errors'>{validationErrors.state}</p>}
                    </div>
                    <div className='spacers'></div>

                    <h3>Describe your place to guests</h3>
                    <h4>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h4>
                    <textarea
                        rows={4}
                        cols={50}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}

                        placeholder='Please write at least 30 characters'
                        className='spot-text-box'
                    />
                    {imgCheck && validationErrors.description && <p className='errors'>{validationErrors.description}</p>}
                    <div className='spacers'></div>
                    <h3>Create a title for your spot</h3>
                    <h4>Catch guests' attention with a spot title that highlights what makes your place special.</h4>
                    <input
                        type='text'
                        value={name}

                        onChange={(e) => { setName(e.target.value) }}
                        className='spot-input'
                        placeholder='Name of your spot'
                    />
                    {imgCheck && validationErrors.name && <p className='errors'>{validationErrors.name}</p>}
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
                    {imgCheck && validationErrors.price && <p className='errors'>{validationErrors.price}</p>}
                    <div className='spacers'></div>
                    <h3>Liven up your spot with photos</h3>
                    <h4>Submit a link to at least one photo to publish your spot</h4>

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Preview Image URL'
                        value={previewImage.url}
                        onChange={(e) => handleImageInput(e.target.value, 0)}

                    />
                    {imgCheck && validationErrors.preview && <p className='errors'>{validationErrors.preview}</p>}
                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                        value={imgOne.url}
                        onChange={(e) => handleImageInput(e.target.value, 1)}
                    />
                    {imgCheck && validationErrors.url && <p className='errors'>{validationErrors.url}</p>}
                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                        value={imgTwo.url}
                        onChange={(e) => handleImageInput(e.target.value, 2)}
                    />

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                        value={imgThree.url}
                        onChange={(e) => handleImageInput(e.target.value, 3)}
                    />

                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                        value={imgFour.url}
                        onChange={(e) => handleImageInput(e.target.value, 4)}
                    />
                    <div className='spacers'></div>

                    <div className='button-container'>
                        <button type="submit" className="spot-button" >Create Spot</button>
                    </div>
                </form>
            </div>
        </>
    )
}


export default EditSpot
