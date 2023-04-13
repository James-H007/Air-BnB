
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
    const [previewImage, setPreviewImage] = useState({})
    const [imgOne, setImgOne] = useState({})
    const [imgTwo, setImgTwo] = useState({})
    const [imgThree, setImgThree] = useState({})
    const [imgFour, setImgFour] = useState({})
    const [imgCheck, setImgCheck] = useState(false)


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

    useEffect(() => {
        const errors = {}
        const allImages = [previewImage, imgOne, imgTwo, imgThree, imgFour]
        const validImgs = [".jpg", "jpeg", ".png"]
        if (!previewImage.url) { errors["preview"] = "Preview image is required." }

        for (let i = 0; i < allImages.length; i++) {
            let image = allImages[i]
            if (image.url && !validImgs.includes(image.url.slice(-4))) {
                errors["url"] = "Image URL must end in .png, .jpg, or jpeg"
            }
        }


        // console.log(errors)

        setValidationErrors(errors)

    }, [previewImage, imgOne, imgTwo, imgThree, imgFour])



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        try {
            const newSpot = await dispatch(spotActions.createSpot({ address, city, state, country, lat, lng, name, description, price }));
            const { id } = newSpot;
            // console.log(id)
            // console.log(newSpot);
            await dispatch(spotImageActions.addImage(previewImage, id))
            if (imgOne) await dispatch(spotImageActions.addImage(imgOne, id))
            if (imgTwo) await dispatch(spotImageActions.addImage(imgTwo, id))
            if (imgThree) await dispatch(spotImageActions.addImage(imgThree, id))
            if (imgFour) await dispatch(spotImageActions.addImage(imgFour, id))

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
                    <h2>Create a New Spot</h2>
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
                    {errors.country && <p className='errors'>{errors.country}</p>}
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
                    {errors.address && <p className='errors'>{errors.address}</p>}
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
                        {errors.city && <p className='errors'>{errors.city}</p>}
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
                        {errors.state && <p className='errors'>{errors.state}</p>}
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
                    {errors.description && <p className='errors'>{errors.description}</p>}
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
                    {errors.name && <p className='errors'>{errors.name}</p>}
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
                    {errors.price && <p className='errors'>{errors.price}</p>}
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
                    {validationErrors.preview && imgCheck && <p className='errors'>{validationErrors.preview}</p>}
                    <input
                        type='text'
                        className='spot-input'
                        placeholder='Image URL'
                        value={imgOne.url}
                        onChange={(e) => handleImageInput(e.target.value, 1)}
                    />
                    {validationErrors.url && imgCheck && <p className='errors'>{validationErrors.url}</p>}
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

export default CreateSpot
