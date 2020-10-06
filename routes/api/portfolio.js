const express = require('express');
const router = express.Router();
const passport = require('passport');

//Middleware
const uploadMiddleware = require('../../middleware/upload');

// Item Model and Controller
const portfolioController = require('../../controllers/portfolioController');



router.use('/upload', passport.authenticate('jwt', { session: false } ));
router.use('/upload', uploadMiddleware.uploadFileToCloudinary)
router.route('/upload')
    .post((req, res) => {
        console.log(req.upload_file)
    });

module.exports = router;


