const express = require('express');
const router = express.Router();
const passport = require('passport');

//Middleware
const uploadMiddleware = require('../../middleware/upload');

// Add auth middleware
const authMiddleware = require('../../middleware/authorization');

// Item Model and Controller
const portfolioController = require('../../controllers/portfolioController');

router.use('/upload', authMiddleware.authenticateJWT);
router.use('/upload', uploadMiddleware.uploadFileVerify);
router.use('/upload', uploadMiddleware.uploadFileToCloudinary);
router.route('/upload')
    .post((req, res) => {
        res.status(200).json({
            message: 'file success uploaded',
            status: true
        });
    })

module.exports = router;


