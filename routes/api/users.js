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

/**
 * @api {get} /api/users/alluser Get all user's info from DB
 * @apiName GetAllUsers
 * @apiGroup Users
 *
 * @apiSuccess {User[]} Users Array of user's info
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK 
 * {
 *     "confirm": true,
 *	   "isAdmin": false,
 * 	   "_id": "5f644add72d3ff4a0413ff56",
 *	   "email": "itsmemario@gmail.com",
 *	   "username": "a",
 *	   "password": "$2a$10$vyPiyp4YrYxI20.wP4Suc.4dj7okRR5pM1g7s1j1UoTOJS09hWZ8G",
 *	   "date": "2020-09-18T05:51:25.921Z",
 *	   "__v": 0
 * },
 * {
 *	   "confirm": true,
 *	   "isAdmin": false,
 *	   "_id": "5f61fafd802dd1455cd488cc",
 *	   "email": "modofa1977@araniera.net",
 *	   "username": "a",
 *	   "password": "$2a$10$BUUI/8btB/pVQHPSZpey7O4QMdyQYl//M1nWKO6hMDXWTtu3KNmoO",
 * 	   "date": "2020-09-16T11:46:05.311Z",
 *	   "__v": 0
 * }
 */
router.route('/alluser')
    .get(usersController.getAllUser);

/**
 * @api {post} /register Register a user into our database
 * @apiName RegisterUser
 * @apiGroup Users
 *
 * @apiParam {String} email User's email, must be unique
 * @apiParam {String} username User's chosen username, not unique
 * @apiParam {String} password User's chosen password, not unique
 *
 * @apiParamExample Example Body: 
 * {
 *     "email": "bobdillon@gmail.com",
 *     "username": "Bobby123",
 *	   "password": "Bobby123"
 * }
 *
 * @apiSuccess {String} status Registration results
 *
 * @apiSuccessExample Sucessful Response:
 * HTTP/1.1 201 OK
 * {
 *     "status": "Thank you for registering - Please confirm your email address."
 * }
 *
 * @apiError (200) EmailAlreadyRegistered Email inputted is already registered in database.
 * 
 * @apiErrorExample Error-Response:
 * HTTP/1.1 200 OK
 * {
 *     "status": "Email is already registered"	
 * }
 */
router.route('/register')
    .post(usersController.checkBody, usersController.registerNewUser);


router.route('/confirmation/:userId')
    .get(usersController.userEmailConfirmation);

/**
 * @api {post} /login Login user into our website
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiParam {String} email User's email
 * @apiParam {String} password User's password
 *
 * @apiParamExample Example Body:
 * {
 *     "email":	"modofa1977@araniera.net",
 *	   "password": "a"
 * }
 *
 * @apiSuccess {String} message login successful message
 * @apiSuccess {String} token Access token generated when user successfully logs in
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200
 * {
 *     "message": "Login sucessful",
 *     "token": "Bearer foawheof8f89k23nkjy87yfiuawfkhfaiuwhui"
 * }
 * 
 * @apiError IncorrectUserDetails Email already exist or password is wrong
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Email or Password is incorrect."
 * }
 */
router.route('/login')
	.post(usersController.loginUser);

// THIS IS FOR TESTING (TO MAKE SURE THAT TOKENS ARE VALIDATED)
// authentication middleware passed here to make sure if token is valid
router.use('/test', passport.authenticate('jwt', { session: false } ));
router.route('/test')
	.get(usersController.testUser);

module.exports = router;