import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotReviews, removeReview } from "../../store/review"
import './reviewDetails.css'
import { useState, useRef } from "react"
import { NavLink } from "react-router-dom"
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewFormModal from "../ReviewFormModal"
import DeleteReview from "./deleteReview"
import { useModal } from '../../context/Modal';
import { useContext } from "react"




const SpotReviews = ({ id, ownerId }) => {
    // console.log(id)

    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.reviews.Reviews)
    const user = useSelector(state => state.session.user)
    const [isOwner, setOwner] = useState(false)
    const [allowReview, setAllowReview] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false)
    const ulRef = useRef(); //Referes
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    // console.log(user)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);


    useEffect(() => {
        const checkOwner = () => {
            if (user) {
                setOwner(user.id === ownerId)
                // console.log("The owner is", isOwner)
            }
        }

        const checkReviewed = () => {
            if (user && reviews) {
                const reviewIds = reviews.map(review => review.userId)
                setAllowReview(!reviewIds.includes(Number(user.id)))
            }
            else if (user && !reviews) {
                setAllowReview(true)
            }
        }



        checkOwner();
        checkReviewed();
    }, [user, ownerId, reviews])

    const reviewCheck = () => {
        if (reviews) {
            reviews.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt)
            })

        }
    }


    useEffect(() => {
        dispatch(fetchSpotReviews(id))
        reviewCheck()
        setIsLoaded(true)
    }, [dispatch, id])





    // useEffect(() => {
    //     dispatch(fetchSpotReviews(id))
    // }, [dispatch, id])



    // useEffect(() => {
    //     if (render) {

    //         dispatch(fetchSpotReviews(id))
    //         setRender(false)
    //     }



    // }, [setRender])



    // const handleDelete = async () => {
    //     if (user && reviews) {
    //         const reviewIds = reviews.map(review => review.userId)

    //         if (reviewIds.includes(user.id)) {
    //             console.log(reviews)
    //             const selectedReview = reviews.find(review => review.userId === user.id)
    //             console.log(selectedReview)
    //             await dispatch(removeReview(selectedReview.id))
    //             await dispatch(fetchSpotReviews(id))
    //         }
    //     }
    // }


    return (
        <>

            {isLoaded && user && !isOwner && allowReview &&
                <>
                    <div >
                        <button className="review-button">
                            <OpenModalMenuItem
                                itemText="Post a review"
                                onItemClick={closeMenu}
                                modalComponent={<ReviewFormModal id={id} />}
                            >
                            </OpenModalMenuItem>
                        </button>
                    </div>



                </>
            }
            {isLoaded && reviews && <div className="comment-section">

                {reviews.map(({ id, review, createdAt, updatedAt, User, userId, spotId }) => (
                    <li key={id} className="indiv-review">
                        <p className="first-name">{User.firstName}</p>
                        <p className="year">{months[(new Date(createdAt)).getMonth()]} {createdAt.slice(0, 4)}</p>
                        <p className="review-para">{review}</p>
                        <div className="update-delete">
                            {user && userId && Number(userId) === user.id && <button className="review-button">Update</button>}
                            {user && userId && Number(userId) === user.id && <OpenModalMenuItem
                                itemText={
                                    <button className="review-button">Delete</button>
                                }
                                onItemClick={closeMenu}
                                modalComponent={<DeleteReview user={user} reviews={reviews} />}
                            />}
                        </div>
                    </li>
                ))}
            </div>}

            {isLoaded && !reviews && user && !isOwner && <div className="first-review">
                Be the first to post a review!
            </div>}
        </>
    )
}

export default SpotReviews
