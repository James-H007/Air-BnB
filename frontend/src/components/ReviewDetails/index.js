import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotReviews } from "../../store/review"
import './reviewDetails.css'
import { useState } from "react"
import { NavLink } from "react-router-dom"
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import ReviewFormModal from "../ReviewFormModal"




const SpotReviews = ({ id, ownerId }) => {
    // console.log(id)
    const dispatch = useDispatch()
    const reviews = useSelector(state => state.review.reviews.Reviews)
    const user = useSelector(state => state.session.user)
    const [isOwner, setOwner] = useState(false)
    const [allowReview, setAllowReview] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    // const ulRef = useRef(); //Referes
    console.log("Reviews", reviews)
    console.log(user)

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
                console.log("The owner is", isOwner)
            }
        }

        const checkReviewed = () => {
            if (user) {
                if (!reviews) {
                    setAllowReview(true)
                    return
                }

                if (reviews) {
                    const reviewIds = reviews.map(review => review.userId)
                    console.log(reviewIds)
                    setAllowReview(!reviewIds.includes(Number(user.id)))
                    console.log(allowReview)
                }
            }
        }

        checkOwner();
        checkReviewed();
    }, [user, ownerId, reviews])



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
                {!isOwner && allowReview &&
                    <>
                        <div className="review-button">
                            <OpenModalMenuItem
                                itemText="Post a review"
                                onItemClick={closeMenu}
                                modalComponent={<ReviewFormModal id={id} />}
                            />
                        </div>



                    </>
                }
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
