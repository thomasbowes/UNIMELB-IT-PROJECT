const express = require('express');
const router = express.Router();

// Item Model and Controller
const portfolioController = require('../../controllers/portfolioController');


router.route('/upload')
    .post(portfolioController.uploadFileToCloudinary);

module.exports = router;


