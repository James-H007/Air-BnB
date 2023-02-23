const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
const spot = require('../../db/models/spot');
const Sequelize = require('sequelize');

const router = express.Router()

// Get all of the Current User's Bookings # 20

router.get("/current", requireAuth, async(req,res,next) => {

})









module.exports = router;
