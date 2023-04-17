import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';

// import * as spotActions from "../../store/spots"
import { fetchSpotReviews, removeReview } from "../../store/review"
import { fetchSingleSpot } from '../../store/spots';

function DeleteReview({ user, reviews, spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();


    const handleDelete = async () => {
        if (user && reviews) {
            const reviewIds = reviews.map(review => review.userId)

            if (reviewIds.includes(user.id)) {
                // console.log(reviews)
                const selectedReview = reviews.find(review => review.userId === user.id)
                console.log(selectedReview)
                await dispatch(removeReview(selectedReview.id))
                await dispatch(fetchSpotReviews(selectedReview.spotId))
                await dispatch(fetchSingleSpot(selectedReview.spotId))
                closeModal()
            }
        }
    }

    // useEffect(() => {
    //     dispatch(fetchSpotReviews(spottyId))

    //     if (reviews) {
    //         reviews.sort(function (a, b) {
    //             return new Date(b.createdAt) - new Date(a.createdAt)
    //         })
    //         // console.log(reviews)

    //     }
    // }, [dispatch])

    const onClose = () => {
        closeModal();
    }
    return (
        <div className='spot-delete-form'>
            <div className='spot-delete-modal'>
                <div className='header-delete'>Confirm Delete</div>
                <div className='disclaimer'>Are you sure you want to delete this review?</div>
                <button className='delete-btn1' onClick={handleDelete}>Yes (Delete Review)</button>
                <button className='delete-btn2' onClick={onClose}>No (Keep Review)</button>
            </div>

        </div>
    )
}

export default DeleteReview
