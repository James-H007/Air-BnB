const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
const Sequelize = require('sequelize');
const {Op} = require("sequelize"); //Using sequelize operators
// const { router } = require('../../app'); //This line causes problems

const router = express.Router();

let schema;
if(process.env.NODE_ENV === 'prouduction') {
    schema = process.env.SCHEMA; //define your schema in options object
}

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
        return res.status(404).json({
            message: err.message,
            statusCode: err.status
        })
    }

    if(!checkReviewUser) {
        const err = new Error("Forbidden")
        // err.title = 'Unauthorized';
        // err.errors = ['Unauthorized'];
        err.status = 403;
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
    const userReviews = await Review.findAll({
      where: { userId: userId },
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: Spot,
          attributes: [
            "id",
            "ownerId",
            "address",
            "city",
            "state",
            "country",
            "lat",
            "lng",
            "name",
            "price",
          ],
          include: [
            {
              model: SpotImage,
              attributes: ["url"],
              where: { preview: true },
              required: false,
            },
          ],
        },
        {
          model: ReviewImage,
          attributes: ["id", "url"],
        },
      ],
      attributes: [
        "id",
        "userId",
        "spotId",
        "review",
        "stars",
        "createdAt",
        "updatedAt",
      ],
    });

    const Reviews = userReviews.map((review) => {
      const spot = review.Spot;
      const previewImage =
        spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null; // check if there are any images available

      return {
        id: review.id,
        userId: review.userId,
        spotId: review.spotId,
        review: review.review,
        stars: review.stars,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
        User: review.User,
        ReviewImages: review.ReviewImages,
        Spot: {
          id: spot.id,
          ownerId: spot.ownerId,
          address: spot.address,
          city: spot.city,
          state: spot.state,
          country: spot.country,
          lat: spot.lat,
          lng: spot.lng,
          name: spot.name,
          price: spot.price,
          previewImage: previewImage,
        },
      };
    });

    return res.status(200).json({ Reviews });
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
        return res.status(404).json({
            message: err.message,
            statusCode: err.status
        })
        // err.errors = ["Review couldn't be found"]
        // return next(err)
    }

    else {
    await userCheck.update({
        review,
        stars
    })

    return res.status(200).json(userCheck)
    }

})

//Delete a Review #18
router.delete('/:reviewId', requireAuth, async(req,res,next) => {
    const {reviewId} = req.params
    const userId = req.user.id

    const errorReviewCheck = await Review.findByPk(reviewId)
    if(!errorReviewCheck) {
        const err = new Error("Review couldn't be found")
        err.status = 404
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404
        })
    }
    const selectedReview = await Review.findOne({where: {id: reviewId, userId: userId}})
    if (!selectedReview) {
        const err = new Error("Forbidden")
        // err.title = 'Unauthorized';
        // err.errors = ['Unauthorized'];
        err.status = 403;
        return next(err);
    }

    else {
    await selectedReview.destroy()
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
    }
})












module.exports = router;
