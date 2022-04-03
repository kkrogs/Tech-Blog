const router = require('express').Router();
const userRoute = require('./userRoute')
const postRoute = require('./postRoute')
const commentRoutes = require('./commentRoute')

// determines the route depending on the input
router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoutes);

module.exports = router;
