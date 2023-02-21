const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
const spot = require('../../db/models/spot');
const Sequelize = require('sequelize');
// const { router } = require('../../app');

const router = express.Router()

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
        .notEmpty(),
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
]

//#6 Get all Spots
router.get('/', async(req,res) => {
    console.log("test")
    const allSpots = await Spot.findAll()

    res.status(200)
    res.json({Spots: allSpots})
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
    }
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
            }
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

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    user.update({
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

    res.status(200).json(user)


})


// Create a Review for a Spot based on the Spot's id #13
router.post('/:spotId/reviews', requireAuth, validateNewReview, async(req,res,next) => {
    const newUserId = req.user.id;
    const {spotId} = req.params
    const {review, stars} = req.body
    console.log(userId)
    console.log(spotId)
    const checkDuplicateReview = await Review.findOne({where: {userId:userId, spotId: spotId}})
    if (!spotId){
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
    else if (userId && spotId) { //There is something wrong in this block of code
        console.log("Error happened in the third block")
        console.log(userId, spotId, review, stars)

        const newReview = await Review.create({
            userId: newUserId,
            spotId: spotId,
            review: review,
            stars: stars,
            createdAt: new Date('2023-02-01T00:00:00'),
            updatedAt: new Date('2023-02-02T00:00:00')
        })

        return res.status(200).json(newReview)
    }

})



module.exports = router;
