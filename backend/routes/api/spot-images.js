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

// Delete an Image for a Spot review #24
router.delete('/:imageId', requireAuth, async(req,res,next) => {
    const {imageId} = req.params
    const userId = req.user.id
    const spotImage = await SpotImage.findByPk(imageId)

    if(!spotImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        })
    }
    const spotId = spotImage.id



    const spot = await Spot.findByPk(spotId)
    const ownerId = spot.ownerId

    if(ownerId !== userId) {
        const err = new Error("Unauthorized access")
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }

    else {
        await spotImage.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }

})













module.exports = router;
