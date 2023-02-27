const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
const spot = require('../../db/models/spot');
const Sequelize = require('sequelize');
const {Op} = require("sequelize") //Using sequelize operators

const router = express.Router()

router.delete('/:imageId', requireAuth, async(req,res,next) => {
    const {imageId} = req.params
    const userId = req.user.id
    const reviewImage = await ReviewImage.findByPk(imageId)

    if (!reviewImage) {
        return res.status(404).json({
            message: "Review Image couldn't be found",
            statusCode: 404
        })
    }

    const reviewId = reviewImage.reviewId

    const review = await Review.findByPk(reviewId)
    const reviewerId = review.userId

    if(userId !== reviewerId) {
        // const err = new Error("Unauthorized access")
        // err.title = 'Unauthorized';
        // err.errors = ['Unauthorized'];
        // err.status = 401;
        // return next(err);
        const err = new Error("Forbidden")
        err.title = 'Forbidden';
        // err.errors = ['Unauthorized'];
        err.status = 403;
        return next(err);
    }

    else {
        await reviewImage.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }

})





module.exports = router;
