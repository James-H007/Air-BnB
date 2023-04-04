// backend/routes/api/users.js
const express = require('express')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { token } = require('morgan');

const router = express.Router();

const validateSignup = [
  check('email') //Checking if it's a valid email
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Invalid email'),
  check('username') //NEW! Checks if username exists
    .exists({ checkFalsy: true })
    .withMessage("Username is required"),
  check('firstName') //NEW! Checks if firstName exists
    .exists({ checkFalsy: true })
    .withMessage("First Name is required"),
  check("lastName") //NEW! Checks if lastName exists
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required"),
  // check('username') //Check if the user is at least 4 characters
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 4 })
  //   .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {

    // console.log("Look over here!")

    const { email, password, username, firstName, lastName } = req.body;

    const emailCheck = await User.findOne({
      where: { email: email }
    })

    const usernameCheck = await User.findOne({
      where: { username: username }
    })

    if (emailCheck) { //Validation check if a user with the specified email exists
      // console.log(emailCheck)
      // errors: {
      //   email: "User with that email already exists"
      // }
      const err = new Error("User already exists")
      err.status = 403
      err.errors = ["User with that email already exists"]
      return res.status(403).json({
        message: err.message,
        statusCode: err.status,
        errors: {
          email: "User with that email already exists"
        }
      })
    }
    else if (usernameCheck) { //Validation check if a user has a duplicated username
      const err = new Error("User already exists")
      err.status = 403;
      err.errors = ["User with that username already exists"]
      return res.status(403).json({
        message: err.message,
        statusCode: err.status,
        errors: {
          email: "User with that username already exists"
        }
      })
    }
    else {
      const user = await User.signup({ email, username, password, firstName, lastName });
      const newToken = await setTokenCookie(res, user);
      // console.log(user.email)
      // console.log(newToken)
      return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: newToken
      });
    }


  }
);




module.exports = router;
