const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { isFloat } = require('validator');
// const { router } = require('../../app');

const router = express.Router();

//Get all Reviews of the Current User #15

router.get("/", async(req,res,next) => {
    res.send("Lol")
})
















module.exports = router;
