const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
// const { router } = require('../../app'); //This line causes problems

const router = express.Router();

const validateNewReview = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({min: 1, max: 5})
        .withMessage('Stars must be an integer from 1 to 5'),
        handleValidationErrors
]

//Add an Image to a Review based on the Review's id

router.post("/:reviewId/images", requireAuth, async(req,res,next) => {
    console.log("You found me")
    const userId = req.user.id;
    const {reviewId} = req.params
    const {url} = req.body
    const selectedReview = await Review.findByPk(reviewId)
    const checkReviewUser = await Review.findOne({where: {userId: userId, id: reviewId}})
    const reviewImageCount = await ReviewImage.findAll({where: {reviewId: reviewId}})

    if(!selectedReview) {
        const err = new Error ("Review couldn't be found")
        err.status = 404
        return res.json({
            message: err.message,
            statusCode: err.status
        })
    }

    if(!checkReviewUser) {
        const err = new Error("Unauthorized access")
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }

    if(reviewImageCount.length >= 10) {
        const err = new Error ("Maximum number of images for this resource was reached")
        err.status = 403;
        return next(err)
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: reviewId,
        url
    })

    return res.status(200).json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

// Get all Reviews of the Current User #15
router.get("/current", requireAuth, async(req,res, next) => {
    const userId = req.user.id;
    // const checkReviewUser = await Review.findOne({where: {userId: userId}})
    const userReviews = await Review.findAll({where: {userId: userId},
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            attributes: {exclude: []}
        }
        ]

    })

    // if(!checkReviewUser) {
    //     const err = new Error("Unauthorized access")
    //     err.title = 'Unauthorized';
    //     err.errors = ['Unauthorized'];
    //     err.status = 401;
    //     return next(err);
    // }

})

// Edit a Review # 17
router.put("/:reviewId", requireAuth, validateNewReview, async(req,res, next) => {
    const userId = req.user.id
    const {reviewId} = req.params
    const {review, stars} = req.body
    const userCheck = await Review.findOne({where: {userId: userId, id: reviewId}})

    if (!userCheck) {
        const err = new Error ("Review couldn't be found")
        err.status = 404
        err.errors = ["Review couldn't be found"]
        return next(err)
    }

    userCheck.update({
        review,
        stars
    })

    return res.status(200).json(userCheck)

})












module.exports = router;
