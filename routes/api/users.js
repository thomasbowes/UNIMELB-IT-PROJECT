const express = require('express');
const router = express.Router();

const passport = require('passport');

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

router.route('/login')
	.post(usersController.loginUser);

// THIS IS FOR TESTING (TO MAKE SURE THAT TOKENS ARE VALIDATED)
// authentication middleware passed here to make sure if token is valid
router.use('/test', passport.authenticate('jwt', { session: false } ));
router.route('/test')
	.get(usersController.testUser);

module.exports = router;