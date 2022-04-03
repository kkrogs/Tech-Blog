const router = require('express').Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./home-routes')

//this file determines part of the route request. If it has /api we use the api folder, or else we use the home-routes file 
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
