import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { fetchSingleSpot } from "../../store/spots";
import './spot.css'
import SpotReviews from "../ReviewDetails";


const SpotDetails = () => {
    const dispatch = useDispatch();
    const placeholder = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
    const { id } = useParams();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [avgStarRating, setAvgStarRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);
    const [SpotImages, setSpotImages] = useState()
    const [previewImage, setPreviewImage] = useState()
    const [load, setLoad] = useState(false)
    const placeholders = [placeholder, placeholder, placeholder, placeholder]
    const [subImages, setSubImages] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    // const [subImages, setSubImages] = useState([placeholder, placeholder, placeholder, placeholder])


    console.log(id)
    const selectedSpot = useSelector(state => state.spot.spot)
    console.log(selectedSpot)

    const handleAlert = () => {
        alert("Feature Coming Soon...")
    }

    useEffect(() => {
        dispatch(fetchSingleSpot(id))
    }, [dispatch, id])



    useEffect(() => {
        if (selectedSpot) {

            const { name, address, city, state, country, price, description, avgStarRating, numReviews, SpotImages, Owner } = selectedSpot;
            setName(name);
            setAddress(address)
            setCity(city)
            setState(state)
            setCountry(country)
            setPrice(price)
            setDescription(description)
            setAvgStarRating(avgStarRating)
            setNumReviews(numReviews)
            setSpotImages(SpotImages)
            // console.log(SpotImages)
            setPreviewImage(SpotImages.find(image => image.preview === true).url)

            const filteredImages = SpotImages.filter(image => image.preview === false);
            // console.log(filteredImages)

            for (let i = 0; i < filteredImages.length; i++) {
                placeholders[i] = filteredImages[i].url
            }

            setSubImages(placeholders)
            setFirstName(Owner.firstName);
            setLastName(Owner.lastName);
            setLoad(true)
        }
    }, [selectedSpot])

    return (
        <>
            {selectedSpot && load &&
                <div className="entire-spot">
                    <header>{name}</header>
                    <span className="location-info">{city},{state},{country}</span>
                    <div className="image-container">
                        <section className="main-image">
                            <img src={previewImage} alt="preview-image" className="preview" />
                        </section>
                        <section className="sub-images">
                            <div className="sub-image-sections">
                                <figure className="sub-image"><img src={subImages[0]} alt="small-image" className="small-img" /></figure>
                                <figure className="sub-image"><img src={subImages[1]} alt="small-image" className="small-img" /></figure>
                            </div>
                            <div className="sub-image-sections">
                                <figure className="sub-image"><img src={subImages[2]} alt="small-image" className="small-img" /></figure>
                                <figure className="sub-image"><img src={subImages[3]} alt="small-image" className="small-img" /></figure>
                            </div>
                        </section>
                    </div>
                    <p className="names">Hosted By {firstName} {lastName}</p>
                    <section className="key-info">
                        <p className="description">{description}</p>
                        <div className="reservation">
                            <div className="reserve-info">
                                <p className="price">${price} night</p>
                                <p className="review-prev">⭐ {avgStarRating ? avgStarRating.toFixed(2) : "New"} • {numReviews} reviews</p>
                            </div>
                            <button onClick={handleAlert} className="reserve-button">Reserve</button>
                        </div>
                    </section>

                    <section>
                        <div className="big-review-summ">★ {avgStarRating ? avgStarRating.toFixed(2) : "New"} • {numReviews} reviews</div>
                    </section>
                    <section>
                        <SpotReviews id={id} />
                    </section>
                </div>
            }
        </>
    )
}


export default SpotDetails
