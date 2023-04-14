import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import './reviewForm.css'
import { useState } from 'react';
import { FaStar } from "react-icons/fa"


const ReviewFormModal = ({ id }) => {
    const { closeModal } = useModal() //DON'T FORGET THE PARATHESIS
    const dispatch = useDispatch();
    const [review, setReview] = useState("")
    const stars = Array(5).fill(0);
    console.log(stars)
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined)


    const handleSubmit = (e) => {
        e.preventDefault();
        // setErrors([]);
        return
    }
    return (
        <>
            <div className='entire-page'>
                <form onSubmit={handleSubmit} className='review-form'>
                    <h2 className='text'>How was your stay?</h2>
                    <label >
                        <textarea
                            className='review-desc-text'
                            rows={8}
                            cols={55}
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            placeholder='Leave your review here...'
                        />
                    </label>
                    <div className='star-form'>
                        {stars.map((idx) =>
                        (
                            <li>
                                <FaStar key={idx} className='stars' />

                            </li>
                        )
                        )}
                    </div>
                    <button onClick={handleSubmit} className='review-submit'>Submit Your Review</button>
                </form>
            </div>
        </>
    )
}

export default ReviewFormModal
