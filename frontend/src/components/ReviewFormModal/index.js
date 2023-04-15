import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import './reviewForm.css'
import { useEffect, useState } from 'react';
import { FaStar } from "react-icons/fa"
import * as reviewActions from "../../store/review"
import { useHistory } from 'react-router-dom';

const colors = {
    yellow: "#FFD300",
    gray: "#CCCBC6"
}


const ReviewFormModal = ({ id }) => {
    const { closeModal } = useModal() //DON'T FORGET THE PARATHESIS
    const dispatch = useDispatch();
    const history = useHistory();
    const [review, setReview] = useState("")
    const holder = Array(5).fill(0);
    const [stars, setStars] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined)
    const [validErrors, setValidErrors] = useState({})
    const [errors, setErrors] = useState([]);

    // console.log(review)
    // console.log(stars)


    // console.log(id)

    useEffect(() => {
        const errors = {}
        if (review.length < 10) { errors["review"] = "Must submit at least 10 characters" }
        if (stars === 0) { errors["stars"] = "Must include at minimum star rating of 1" }

        setValidErrors(errors)


    }, [review, stars])

    const handleClick = value => {
        setStars(value)
    };

    const handleMouseOver = value => {
        setHoverValue(value)
    }

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            review,
            stars
        }

        // console.log(data)
        // console.log(id)

        const createdReview = await dispatch(reviewActions.createReview(data, id))
        console.log(createdReview)
        if (createdReview) {
            await dispatch(reviewActions.fetchSpotReviews(id))
            closeModal();
        }


    }
    return (
        <>
            <div className='entire-page'>
                <ul className="errors">
                    {Object.values(errors).map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSubmit} className='review-form'>
                    <h2 className='text'>How was your stay?</h2>
                    <label >
                        <textarea
                            className='review-desc-text'
                            rows={8}
                            cols={50}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder='Leave your review here...'
                        />
                    </label>
                    <h3 className='star-text'>Stars</h3>
                    <div className='star-form'>

                        {holder.map((__, idx) =>
                        (
                            <li>
                                <FaStar key={idx}
                                    style={{
                                        height: 20,
                                        width: 20,
                                        margin: 5,
                                        cursor: "pointer"
                                    }}
                                    color={(hoverValue || stars) > idx ? colors.yellow : colors.gray}
                                    onClick={() => handleClick(idx + 1)}
                                    onMouseOver={() => handleMouseOver(idx + 1)}
                                    onMouseLeave={handleMouseLeave}
                                />

                            </li>
                        )
                        )}
                    </div>
                    <button onClick={handleSubmit} className='review-submit' disabled={Object.values(validErrors).length > 0}>Submit Your Review</button>
                </form>
            </div>
        </>
    )
}

export default ReviewFormModal
