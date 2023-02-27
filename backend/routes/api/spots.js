const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat, validator } = require('validator');
const spot = require('../../db/models/spot');
const Sequelize = require('sequelize');
const {Op} = require("sequelize"); //Using sequelize operators
// const express = require('express');
// const { router } = require('../../app');



const router = express.Router()

let schema;
if (process.env.NODE_ENV === 'production') {
  schema = process.env.SCHEMA;
}


const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value) => {
            if(isNaN(parseFloat(value))) {
                throw new Error('Latitude is not valid')
            }
            return true;
        })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .custom((value) => {
            if(isNaN(parseFloat(value))) {
                throw new Error('Longitude is not valid')
            }
            return true;
        })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({max: 49})
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price per day is required'),
    handleValidationErrors
]

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

const validateQuery = [
    check('page')
        .isInt({min: 1, max: 10})
        .withMessage("Page must be greater than or equal to 1"),
    check('size')
        .isInt({min:1, max: 20})
        .withMessage("Size must be greater than or equal to 1"),
    check('maxLat')
        .optional()
        .isDecimal()
        .withMessage("Maximum latitude is invalid"),
    check('minLat')
        .optional()
        .isDecimal()
        .withMessage("Minimum latitude is invalid"),
    check('minLng')
        .optional()
        .isDecimal()
        .withMessage("Minimum longitude is invalid"),
    check('maxLng')
        .optional()
        .isDecimal()
        .withMessage("Maximum longitude is invalid"),
    check('minPrice')
        .optional()
        .isDecimal({min:0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isDecimal({min:0})
        .withMessage('Minimum price must be greater than or equal to 0'),
    handleValidationErrors
]

//#6 Get all Spots
//Add Query Filters to Get All Spots #26
router.get('/', validateQuery,async(req,res) => {
    console.log("test")
    let query = {
        where: {}
    };


    const page = req.query.page === undefined ? 1 : parseInt(req.query.page);
    const size = req.query.size === undefined ? 1 : parseInt(req.query.size)

    query.page = page
    query.size = size
    console.log(page)
    console.log(size)

    if( page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1)
    }

    let limit = query.limit
    let offset = query.offset

    let {maxLat, minLat, minLng, maxLng, minPrice, maxPrice} = req.query
    console.log('minLat before parse float', minLat)
    maxLat = parseFloat(maxLat)
    minLat = parseFloat(minLat)
    minLng = parseFloat(minLng)
    maxLng = parseFloat(maxLng)
    minPrice = parseFloat(minPrice)
    maxPrice = parseFloat(maxPrice)

    console.log("minLat", minLat) //Seems to be fine
    console.log('maxLat', maxLat)
    console.log('minLng', minLng)
    console.log('maxLng', maxLng)
    console.log('minPrice', minPrice)
    console.log('maxPrice', maxPrice)



    if (minLat) {
        console.log("Error happened here WGAT")
        query.where.lat = {[Op.gte]: [req.query.minLat]}
    }

    if (maxLat) {
        query.where.lat = {[Op.lte]: [req.query.maxLat]}
    }

    if(minLat && maxLat) {
        query.where.lat = {[Op.between]: [req.query.minLat,req.query.maxLat]}
    }


    if (minLng) {
        query.where.lng = {[Op.gte]: [req.query.minLng]}
    }

    if (maxLng) {
        query.where.lng = {[Op.lte]: [req.query.maxLng]}
    }

    if(minLng && maxLng) {
        query.where.lng = {[Op.between]: [req.query.minLng,req.query.maxLng]}
    }

    if (minPrice >= 0) {
        console.log("Error happened here 1")
        query.where.price = {[Op.gte]: [req.query.minPrice]}
    }

    if (maxPrice >= 0) {
        console.log("Error happened here 2")
        query.where.price = {[Op.lte]: [req.query.maxPrice]}
    }

    if(minPrice && maxPrice) {
        query.where.price = {[Op.between]: [req.query.minPrice,req.query.maxPrice]}
    }

    // query.include = [{
    //             model: SpotImage,
    //             attributes: ['url']
    //         },
    //         { model: Review,
    //             attributes: []
    //         }]
    // query.attributes = {
    //     include: [[Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 'avgRating']]
    // }

    // query.group = ['Spot.id', 'SpotImages.id', "Reviews.spotId"]

    // console.log(query)
    query.attributes = [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'description',
        'price',
        'createdAt',
        'updatedAt',
        [
            Sequelize.literal(
              `(SELECT ROUND(AVG(stars), 1) FROM ${
                schema ? `"${schema}"."Reviews"` : 'Reviews'
              } WHERE "Reviews"."spotId" = "Spot"."id")`
            ),
            'avgRating',
        ],
        [
            Sequelize.literal(
                `(SELECT url FROM ${
                  schema ? `"${schema}"."SpotImages"` : 'SpotImages'
                } WHERE "SpotImages"."spotId" = "Spot"."id" AND "SpotImages"."preview" = true LIMIT 1)`
              ),
              'previewImage'
        ]
        ]

    const allSpots = await Spot.findAll(query)

    res.status(200).json(allSpots)
    // const allSpots = await Spot.findAll({query,
    //     include: [{
    //                 model: SpotImage,
    //                 attributes: ['url']
    //             },
    //             { model: Review,
    //                 attributes: [Sequelize.literal(
    //                     `(SELECT ROUND(AVG(stars), 1) FROM ${
    //                       schema ? `"${schema}"."Reviews"` : 'Reviews'
    //                     } WHERE "Reviews"."spotId" = "Spot"."id")`
    //                   ),
    //                   'avgRating']}
    //             ],
    //             group: ['Spot.id', 'SpotImages.id', "Reviews.spotId"],
    //     limit,
    //     offset

    // })




    // const allSpots = await Spot.findAll({
    //     include: [{
    //         model: SpotImage,
    //         attributes: ['url']
    //     },
    //     { model: Review,
    //         attributes: []}
    //     ],
    //     attributes: {
    //         include: [[Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 'avgRating']]
    //     },
    //     group: ['Spot.id', 'SpotImages.id', "Reviews.spotId"]
    // })

    // const payload = allSpots.map(spot => ({
    //     id: spot.id,
    //     ownerId: spot.ownerId,
    //     address: spot.address,
    //     city: spot.city,
    //     state: spot.state,
    //     country: spot.country,
    //     lat: spot.lat,
    //     lng: spot.lng,
    //     name: spot.name,
    //     description: spot.description,
    //     price: spot.price,
    //     createdAt: spot.createdAt,
    //     updatedAt: spot.updatedAt,
    //     avgRating: spot.dataValues.avgRating,
    //     previewImage: spot.SpotImages[0]?.url || null //Use the first preview image or null
    // }))

    // res.status(200)
    // res.json({Spots: payload,page,size})
})


//Create a Spot #7
router.post('/', requireAuth, validateNewSpot, async(req,res, next) => {
    console.log(req.user.id) // <= This is how you access the user id
    const newOwnerId = req.user.id
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const newSpot = await Spot.create({
        ownerId: newOwnerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.status(201).json(newSpot)
})

//Add an Image to a Spot based on the Spot's id #8
router.post('/:spotId/images', requireAuth, async (req,res,next) => {
    const {spotId} = req.params
    const selectedSpot = await Spot.findOne({where: {id: spotId}})
    if(!selectedSpot) {
        return res.status(404).json({
            message: "Spot could not be found",
            statusCode: 404
        })
    }
    const userId = req.user.id
    const user = await Spot.findOne({where: {ownerId: userId, id: spotId}})
    // console.log(user)
    if (!user) {
        const err = new Error("Unauthorized access")
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }

    else if(user) {
        const {url, preview} = req.body
        const newImage = await SpotImage.create({
            spotId: spotId,
            url,
            preview,
        })

        return res.status(200).json({
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview
        })
    }

})


//Get all spots by the current User #9
router.get('/current', requireAuth, async(req,res,next) => {
    const userId = req.user.id
    const Spots = await Spot.findAll({where: {ownerId: userId},
    include: [{
        model: SpotImage,
        attributes: ['url']
    },
    { model: Review,
        attributes: []}
    ],
    attributes: {
        include: [[Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 'avgRating']]
    },
    group: ['Spot.id', 'SpotImages.id', "Reviews.spotId"]
    })

    const payload = Spots.map(spot => ({
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating: spot.dataValues.avgRating,
        previewImage: spot.SpotImages[0]?.url || null //Use the first preview image or null
    }))
    res.status(200).json({Spots: payload})
})

// Get details of a Spot from an id #10
router.get("/:spotId", async(req,res,next) => {
    const {spotId} = req.params
    const selectedSpot = await Spot.findByPk(spotId,
        {
            include: [
                {
                    model: SpotImage,
                    attributes: ['id', 'url', 'preview']
                },
                {
                    model: User,
                    as: 'Owner', //aliasing
                    attributes: ['id', 'firstName', 'lastName'],

                },
                {
                    model: Review,
                    attributes: []
                }
            ],
            attributes: {
                include: [
                    [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), 'avgStarRating'],
                    [Sequelize.fn("COUNT", Sequelize.col("Reviews.stars")), 'numReviews']
                ]
            },
            group: ['Spot.id', 'SpotImages.id', "Reviews.spotId", "Owner.id"]
        },
        )
    const errorSpotCheck = await Spot.findOne({where: {id: spotId}})
    if(!errorSpotCheck) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    return res.status(200).json(selectedSpot)

})

// Edit a Spot #11
router.put("/:spotId", requireAuth, validateNewSpot, async (req,res,next) => {
    const {spotId} = req.params
    const userId = req.user.id;

    const errorSpotCheck = await Spot.findOne({where: {id: spotId}})
    if(!errorSpotCheck) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const user = await Spot.findOne({where: {ownerId: userId, id: spotId}})
    if  (!user) {
        const err = new Error("Unauthorized access")
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }

    else {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    await user.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(200).json(user)
    }

})

//Delete a Spot #12
router.delete("/:spotId", requireAuth, async(req,res, next) => {
    const {spotId} = req.params
    const userId = req.user.id;

    const errorSpotCheck = await Spot.findOne({where: {id: spotId}})
    if(!errorSpotCheck) {
        const err = new Error("Spot couldn't be found")
        err.status(404)
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const user = await Spot.findOne({where: {ownerId: userId, id: spotId}})
    if  (!user) {
        const err = new Error("Unauthorized access")
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    }

    else {
    await user.destroy()
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })
    }
})


// Create a Review for a Spot based on the Spot's id #13
router.post('/:spotId/reviews', requireAuth, validateNewReview, async(req,res,next) => {
    const newUserId = req.user.id;
    const {spotId} = req.params
    const {review, stars} = req.body
    console.log("newUserId:", newUserId)
    console.log("spotId: ",spotId)
    const checkSpot= await Spot.findByPk(spotId)
    const checkDuplicateReview = await Review.findOne({where: {userId:newUserId, spotId: spotId}})
    if (!checkSpot){
        console.log("Error happened in the first block")
        const err = new Error ("Spot couldn't be found")
        err.status = 404
        return res.json({
            message: err.message,
            statusCode: err.status
        })
    }
    else if (checkDuplicateReview) {
        console.log("Error happened in the second block")
        const err = new Error ("User already has a review for this spot")
        err.status = 403
        return res.json({
            message: err.message,
            statusCode: err.status
        })
    }
    else if (newUserId && spotId) { //There is something wrong in this block of code
        console.log("Error happened in the third block")
        console.log(newUserId, spotId, review, stars)

        const newReview = await Review.create({
            userId: newUserId,
            spotId: spotId,
            review: review,
            stars: stars,

        })

        return res.status(200).json(newReview)
    }

})

// Get all Reviews by a Spot's id #16
router.get("/:spotId/reviews", async(req,res,next) => {
    const {spotId} = req.params;

    const Reviews = await Review.findAll({where: {spotId: spotId},
        include: [{
            model: User,
            attributes: ['id', 'firstName','lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }
    ],
    })

    if(Reviews.length == 0) {
        const err = new Error("Spot couldn't be found")
        err.status = 404
        // err.errors = ["Spot couldn't be found"] This does not need to be included
        next(err)
    }
    else {
        res.status(200).json({Reviews})
    }
})


//Create a Booking from a Spot based on the spot's id #19
router.post("/:spotId/bookings", requireAuth, validateBooking, async(req,res,next) => {
    const userId = req.user.id
    const {spotId} = req.params
    const {startDate, endDate} = req.body
    const checkSpot = await Spot.findByPk(spotId)

    //This block will check if the spot exists
    if(!checkSpot) {
        return res.status(404).json({
            message: "Spot could not be found",
            statusCode: 404
        })
    }

    //This block will check if there's any conflicting bookings
    const checkConflictBooking = await Booking.findAll({where:{
        spotId: spotId,
        [Op.or] : [

                {startDate: {[Op.between]: [startDate,endDate]}},
                {endDate: {[Op.between]: [startDate,endDate]}},

        ]
    }})

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



    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })

    return res.status(200).json(newBooking)
})

// Get all Bookings for a Spot based on the Spot's id#21
router.get("/:spotId/bookings", requireAuth, async(req,res,next) => {
    const {spotId} = req.params
    const userId = req.user.id;
    console.log("The user Id as of now is", userId)

    const errorSpotCheck = await Spot.findOne({where: {id: spotId}})
    if(!errorSpotCheck) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const ownerCheck = await Spot.findOne({where: {ownerId: userId, id: spotId}})
    console.log(ownerCheck)

    if(ownerCheck){
        console.log("The owner has been found")
        const Bookings = await Booking.findAll({where: {spotId},
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ]
        }
        )

        return res.status(200).json({Bookings})
    }
    else {
        const Bookings = await Booking.findAll({where: {spotId},
        attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.status(200).json({Bookings})
    }
})


module.exports = router;
