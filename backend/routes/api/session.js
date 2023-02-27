// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { token } = require('morgan');

const router = express.Router();

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'), //Manipulated the message. Old: 'Please provide a valid email or username.'
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'), //Old: 'Please provide a password.'
  handleValidationErrors
];

  // Log in
  router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Invalid credentials'); //Edited the body for invalid credentials
        err.status = 401;
        // err.title = 'Login failed';
        // err.errors = ['The provided credentials were invalid.'];
        // return next(err);
        return res.json({
          message: err.message,
          statusCode: err.status
        })
      }

      else{

      const token = await setTokenCookie(res, user);

      const {id,username,email,firstName,lastName} = user

      return res.json({
        user: {id, username, email, firstName, lastName}
      });
      }
    }
  );


// Log out
router.delete(
    '/',
    (req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

// Restore session user a.k.a Get the current user
router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      // console.log(user.toSafeObject())

      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );




module.exports = router;
