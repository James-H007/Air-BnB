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

const validateBooking = [
    check('startDate')
        .exists({checkFalsy: true})
        .notEmpty()
        .isISO8601()
        .withMessage("The start date is not a valid date."),
    check('endDate')
        .exists({checkFalsy: true})
        .notEmpty()
        .isISO8601()
        .withMessage("The end date is not a valid date."),
    check('endDate')
        .custom((value, {req}) => {
            if (value <= req.body.startDate) {
                throw new Error ("endDate cannot be on or before startDate")
            }
            return true
        }),
    handleValidationErrors
]

// Get all of the Current User's Bookings # 20

router.get("/current", requireAuth, async(req,res,next) => {

})

//Edit a Booking #22
router.put("/:bookingId", requireAuth, validateBooking, async(req,res,next) => {
    const {bookingId} = req.params
    const userId = req.user.id;
    const {startDate, endDate} = req.body

    const checkBooking = await Booking.findByPk(bookingId)

    //Error Response: Couldn't find a booking with a specified Id
    if (!checkBooking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404
        })
    }

    const checkBookingAuthorization = await Booking.findByPk(bookingId, {where: {userId:userId}})

    if  (!checkBookingAuthorization) {
        const err = new Error("Unauthorized access")
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }

    //This block will check if there's any conflicting bookings
    const checkConflictBooking = await Booking.findAll({where:{
        [Op.or] : [

                {startDate: {[Op.between]: [startDate,endDate]}},
                {endDate: {[Op.between]: [startDate,endDate]}},

        ]
    }})

    //Error response: Can't edit a booking that's past the end date
    console.log("Date now", Date.now())
    console.log("End date", endDate)
    console.log(Date.now() > endDate)

    const endDateJS = new Date(endDate)

    console.log(Date.now() > endDateJS)
    if (Date.now() > endDateJS) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    }

    // Error response: Booking conflict
    if(checkConflictBooking.length > 0) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        })
    }

    checkBooking.update({
        startDate,
        endDate
    })

    res.status(200).json(checkBooking)

})

// Delete a Booking #23
router.delete('/:bookingId', requireAuth, async(req,res,next) => {
    const {bookingId} = req.params
    const userId = req.user.id;
    const checkBooking = await Booking.findByPk(bookingId)

        //Error Response: Couldn't find a booking with a specified Id
        if (!checkBooking) {
            return res.status(404).json({
                message: "Booking couldn't be found",
                statusCode: 404
            })
        }

        const checkBookingAuthorization = await Booking.findByPk(bookingId, {where: {userId:userId}})

        if (!checkBookingAuthorization) {
            const err = new Error("Unauthorized access")
            err.title = 'Unauthorized';
            err.errors = ['Unauthorized'];
            err.status = 401;
            return next(err);
        }

        console.log("CheckBookingAuthorization.startDate", checkBookingAuthorization.startDate)
        const selectedStartDate = new Date(checkBookingAuthorization.startDate)
        console.log("Start date object", checkBookingAuthorization.startDate)
        console.log(Date.now())
        console.log("The converted start date",selectedStartDate)
        console.log("Look over here",Date.now() <= selectedStartDate)
        if (Date.now() <= checkBookingAuthorization.startDate) {
            res.status(403).json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            })
        }

        checkBookingAuthorization.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
})



module.exports = router;