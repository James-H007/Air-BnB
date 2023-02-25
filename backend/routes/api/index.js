const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js')
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots')
const reviewsRouter = require('./review.js')
const bookingsRouter = require('./bookings')
const spotImagesRouter = require('./spot-images')
const reviewImageRouter = require('./review-images')
// const { requireAuth } = require('../../utils/auth.js');
// const { setTokenCookie } = require('../../utils/auth.js');
const { User, Spot, Booking, Review, ReviewImage, SpotImage } = require('../../db/models');

// GET /api/restore-user
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/bookings', bookingsRouter)

router.use('/spot-images', spotImagesRouter);

router.use('/review-images', reviewImageRouter)

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

//Getting the spot
router.use('/spots', spotsRouter)

//Getting the review
router.use('/reviews', reviewsRouter);


// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

//   // GET /api/set-token-cookie

// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });



// router.get(
//   '/restore-user',
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.use(restoreUser);
// // GET /api/require-auth
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );


module.exports = router;
