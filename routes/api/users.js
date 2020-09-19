const express = require('express');
const router = express.Router();


// Item Model and Controller
const User = require('../../models/Users');
const usersController = require('../../controllers/usersController');

// @route GET api/items
// @desc Get All Items
// @access Public

// @route POST api/items
// @desc Create A Post
// @access Public

// @route DELETE api/items/:id
// @desc Create A Item
// @access Public

// Chainable route handler, execute different functionalities depending on the type of request
router.route('/alluser')
    .get(usersController.getAllUser);

router.route('/register')
    .post(usersController.registerNewUser);

router.route('/confirmation/:userId')
    .get(usersController.userEmailConfirmation);

module.exports = router;