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
    const userId = req.user.id;
    const userBookings = await Booking.findAll({
        where: {userId: userId},
        include: [
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
                    }
                ],
            }
        ]
    })

    const Bookings = userBookings.map((booking) => {
        const spot = booking.Spot;
        const previewImage = spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null; // check if there are any images available

        return {
            id: booking.id,
            spotId: booking.spotId,
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
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            updatedAt: booking.startDate
        }
    })

    return res.status(200).json({Bookings})
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

    else {
    await checkBooking.update({
        startDate,
        endDate
    })

    res.status(200).json(checkBooking)
    }
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
            const err = new Error("Forbidden")
            // err.title = 'Unauthorized';
            // err.errors = ['Unauthorized'];
            err.status = 403;
            return next(err);
        }

        // console.log("CheckBookingAuthorization.startDate", checkBookingAuthorization.startDate)
        // const selectedStartDate = new Date(checkBookingAuthorization.startDate)
        // selectedStartDate.setHours(1,1,1,1)
        // const now = new Date()
        // now.setHours(1, 1, 1, 1)
        // console.log("Current date", now)
        // console.log("Selected Start date",selectedStartDate)
        // if (now <= selectedStartDate) { //Put a pin on this
        //     res.status(403).json({
        //         message: "Bookings that have been started can't be deleted",
        //         statusCode: 403
        //     })
        // }

        const selectedStartDate = new Date(checkBookingAuthorization.startDate)
        // const selectedEndDate = new Date(checkBookingAuthorization.endDate)
        // selectedEndDate.setUTCHours(0, 0, 0, 0)
        // selectedStartDate.setUTCHours(0, 0, 0, 0) // set hours to 0
        const now = new Date()

        // console.log("Current date", now.toISOString())
        // console.log("Selected Start date",selectedStartDate.toISOString())
        // Old code: now >= selectedStartDate && now <= selectedEndDate
        if (now >= selectedStartDate) {
            return res.status(403).json({
                message: "Bookings that have been started can't be deleted",
                statusCode: 403
            })
        }

        else {
        await checkBookingAuthorization.destroy()
        return res.status(200).json({
            message: "Successfully deleted",
            statusCode: 200
        })
    }
})



module.exports = router;
