import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotReviews } from "../../store/review"
import './reviewDetails.css'



const SpotReviews = ({ id, ownerId }) => {
    // console.log(id)
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.reviews.Reviews)
    const user = useSelector(state => state.session.user)
    let isOwner = false
    // console.log(reviews)
    if (user) {
        isOwner = (user.id == ownerId)
    }


    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]




    useEffect(() => {
        dispatch(fetchSpotReviews(id))

        if (reviews) {
            reviews.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })
            // console.log(reviews)

        }
    }, [dispatch])

    return (
        <>
            {reviews && <div className="comment-section">
                {reviews.map(({ id, review, createdAt, updatedAt, User }) => (
                    <li key={id} className="indiv-review">
                        <p className="first-name">{User.firstName}</p>
                        <p className="year">{months[(new Date(createdAt)).getMonth()]} {createdAt.slice(0, 4)}</p>
                        <p className="review-para">{review}</p>
                    </li>
                ))}
            </div>}

            {!reviews && user && !isOwner && <div className="first-review">
                Be the first to post a review!
            </div>}
        </>
    )
}

export default SpotReviews
