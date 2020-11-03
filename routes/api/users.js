const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });	

const usersController = require('../../controllers/usersController');
const authMiddleware = require('../../middleware/authorization');
const pdfController = require('../../controllers/pdfController');

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
 * @api {get} /api/users/alluser Get all users from our MongoDB database
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
 *	   "firstname": "a",
 *     "lastname": "b",
 *	   "password": "$2a$10$vyPiyp4YrYxI20.wP4Suc.4dj7okRR5pM1g7s1j1UoTOJS09hWZ8G",
 *	   "date": "2020-09-18T05:51:25.921Z",
 *	   "__v": 0
 * },
 * {
 *	   "confirm": true,
 *	   "isAdmin": false,
 *	   "_id": "5f61fafd802dd1455cd488cc",
 *	   "email": "modofa1977@araniera.net",
 *	   "firstname": "a",
 *     "lastname": "b",
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
 * @apiParam {String} firstname User's firstname, not unique
 * @apiParam {String} lastname User's lastname, not unique
 * @apiParam {String} password User's chosen password, not unique
 *
 * @apiParamExample Example Body: 
 * {
 *     "email": "bobdillon@gmail.com",
 *     "firstname": "Bobby",
 *     "password": "123",
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

/**
 * @api {get} /confirmation/:userId Updates user email confirmation status
 * @apiName UserEmailConfirmation
 * @apiGroup Users
 *
 * @apiSuccess {String}  Redirect_URL userId is found and user info is updated (status to true). Response: redirect to /home/notification/welcome
 *
 * @apiError {String} Redirect_URL userId not found. Error-Response: redirect to /not_found
 *
 */
router.route('/confirmation/:userId')
    .get(usersController.userEmailConfirmation);

/**
 * @api {post} /login Login a user into our website
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

// routes below are used for facebook auth
router.route('/oauth/facebook')
	.get(passport.authenticate('facebook', { scope: 'email' }));

router.route('/oauth/facebook/callback')
	.get(passport.authenticate('facebook', { 
		session: false 
	}), (req, res) => {
		const token = usersController.signToken(req.user);
		const refreshToken = usersController.signRefreshToken(req.user);
		res.cookie('auth', token);
		res.cookie('refresh', refreshToken);
		if(process.env.NODE_ENV === 'development'){
			res.redirect('http://localhost:3000');
		}
		else if (process.env.NODE_ENV === 'production'){
			//res.redirect('https://folio-exchange.herokuapp.com/');
			res.redirect(process.env.DOMAIN);
		}
		
	});

// routes below are used for google auth
router.route('/oauth/google')
	.get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/oauth/google/callback')
	.get(passport.authenticate('google', { 
		session: false 
	}), (req, res) => {
		const token = usersController.signToken(req.user);
		const refreshToken = usersController.signRefreshToken(req.user);
		res.cookie('auth', token);
		res.cookie('refresh', refreshToken);
		if(process.env.NODE_ENV === 'development'){
			res.redirect('http://localhost:3000');
		}
		else if (process.env.NODE_ENV === 'production'){
			//res.redirect('https://folio-exchange.herokuapp.com/');
			res.redirect(process.env.DOMAIN);
		}
		
	});

/**
 * @api {get} /authenticate Check if an access token is still valid and return its payload
 * @apiName AuthenticateToken
 * @apiGroup Users
 *
 * @apiSuccess {Object} userInfo info provided in token
 * @apiSuccess {String} status token is valid
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200
 * {
 *     "userInfo": {
 *	       "_id": "jafoiawf982ioqifhiqhf",
 *         "email": "tester1@mail.com",
 *         "firstname": "tester",
 *         "lastname": "testing",
 *         "isAdmin": "true"
 *     }, 
 *     "status: true
 * }
 * 
 * @apiError InvalidToken token is not valid
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Token provided is invalid",
 *     "status": false 
 * }
 */
router.use('/authenticate', authMiddleware.authenticateJWT);
router.route('/authenticate')
	.get(usersController.testUser);

/**
 * @api {post} /refresh Retrieve a new access token and update refresh token
 * @apiName RefreshTokens
 * @apiGroup Users
 *
 * @apiParam {String} refresh_token refresh token provided by front-end
 *
 * @apiParamExample Example Body:
 * {
 *     "access_token": "EAljafjaojoiaewfhiafhfajKLFJhhaflj80xWGqWSPiVXSzCRMl"
 * }
 *
 * @apiSuccess {String} message tokens have been created
 * @apiSuccess {String} token access token is generated
 * @apiSuccess {String} refresh_token refresh token is generated
 * @apiSuccess {Boolean} status successful generation of tokens
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200
 * {
 *     "message": "Successfully created tokens",
 *     "token": "iojafiojeIhfoiheawfAEW9879817815789175899afhafh",
 *     "refresh_token": "fklajfaf982rh1rhHIhi2249898fhahKJGYFHOHKGuih92839",
 *     "status": true
 * }
 * 
 * @apiError InvalidToken token is not valid
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Token is invalid",
 *     "status": false
 * }
 */
router.route('/refresh')
	.post(usersController.refreshTokens);

/**
 * @api {post} /update Update user details
 * @apiName UpdateUser
 * @apiGroup Users
 *
 * @apiParam {Object} contents The attributes you're trying to change 
 *
 * @apiParamExample Example Body:
 * {
 *     "contents": {
 *         "firstname": "Test",
 *         "lastname": "Test",
 *         "password": "Test"	
 *     }
 * }
 *
 * @apiSuccess {String} status User update result
 * @apiSuccess {Object} userDetails Updated user details
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200
 * {
 *     "status": "User details have been successfully updated",
 *     "userDetails": {
 *         "_id": "lkjaf982958klja89809",
 *         "confirm": true,
 *         "isAdmin": false,
 *         "firstname": "Test",
 *         "lastname": "Test",
 *         "password": "ajklfjaj938924kaljfafajalj9872",
 *         "__v": "0"
 *     }
 * 
 * @apiError RequiredContentsMissing If "contents" object is not provided
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "Include body of change"
 * }
 */
router.use('/update', authMiddleware.authenticateJWT);
router.route('/update')
	.post(usersController.changeDetails);

/**
 * @api {get} /search Search for users in database from users input
 * @apiName SearchUsers
 * @apiGroup Users
 *
 * @apiParam {String} search_key Users' input to search for matching users in database
 *
 * @apiParamExample Example Body:
 * {
 *     "key": "dummy" 
 * }
 *
 * @apiSuccess {String} message A message to signify that some results are found successfully
 * @apiSuccess {Object[]} data Users who match the input search key
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200
 * {
 *      "message": "Matches have been found",
        "data": "Left out deliberately, as now the results include passwords"
 * }
 * 
 * @apiError UserNotFound No matching results have been found
 *
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 404 Not Found
 * {
 *     "message": "No matching result"
 * }
 * 
 * @apiError EmptySearch The input string is empty or whitespaces only
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 400 Bad Request
 * {
 *     "message": "Please input something to search for"
 * }
 * 
 */
router.route('/search')
	.get(usersController.returnSearchUserResults);

router.route('/createPDF/:userId')
	.get(pdfController.createPDF);
	
module.exports = router;