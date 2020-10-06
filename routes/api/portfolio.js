const express = require('express');
const router = express.Router();
const passport = require('passport');

// Item Model and Controller
const portfolioController = require('../../controllers/portfolioController');


router.use('/upload', passport.authenticate('jwt', { session: false } ));
router.route('/upload')
    .post(portfolioController.uploadFileToCloudinary);

module.exports = router;


