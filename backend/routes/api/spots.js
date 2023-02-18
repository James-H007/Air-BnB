const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
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


module.exports = router;
