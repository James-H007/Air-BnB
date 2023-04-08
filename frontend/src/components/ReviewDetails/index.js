import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotReviews } from "../../store/review"
import './reviewDetails.css'


const SpotReviews = ({ id }) => {
    console.log(id)
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.reviews.Reviews)
    console.log(reviews)

    useEffect(() => {
        dispatch(fetchSpotReviews(id))
    }, [dispatch])

    return (
        <>
            {reviews && <div className="comment-section">
                {reviews.map(({ id, review, createdAt, updatedAt, User }) => (
                    <li key={id} className="indiv-review">
                        <p className="first-name">{User.firstName}</p>
                        <p className="year">{createdAt.slice(0, 4)}</p>
                        <p className="review-para">{review}</p>
                    </li>
                ))}
            </div>}
        </>
    )
}

export default SpotReviews
