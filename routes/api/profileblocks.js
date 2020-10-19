const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');

// Point to the file storing environment variables, in order to use them in the nodejs app
dotenv.config({ path: './.env' });	

const pblockController = require('../../controllers/profileblocksController');
const authMiddleware = require('../../middleware/authorization');

/**
 * @api {post} /update Updates a profile block in our database
 * @apiName UpdateProfileBlock
 * @apiGroup ProfileBlocks
 *
 * @apiParam {String} user_id User's id (to be associated with profile block), REQUIRED
 * @apiParam {String} profile_id ID of a profile block you're trying to update, REQUIRED
 * @apiParam {Object} contents Object that includes attributes of a profile block you're trying to change, REQUIRED
 *
 * @apiParamExample Example Body: 
 * {
 *     "user_id": "ajfiajijf892jfaiojio",
 *     "profile_id": "lkjalksfi98789348915987897",
 *     "contents": {
 *	       "title": "Test Update",
 *         "aboutMe": "Test Update"
 *     }
 * }
 *
 * @apiSuccess {String} status Profile block update result
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *     "status": "Profile block has been successfully updated"
 * }
 *
 * @apiError RequiredDetailsMissing Required parameters not provided
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "Missing profile id or profile attributes that needs to be changed"
 * }
 */
router.use('/update', authMiddleware.authenticateJWT);
router.use('/update', pblockController.checkUpdateBody);
router.use('/update', authMiddleware.authenticateUser);
router.route('/update')
	.post(pblockController.updateProfile);

/**
 * @api {post} /see searches for a profile block from our database
 * @apiName SearchProfileBlock
 * @apiGroup ProfileBlocks
 *
 * @apiParam {String} user_id ID of user (used to find profile block of user), REQUIRED
 *
 * @apiParamExample Example Body: 
 * {
 *     "user_id": "5f81bdf6db99e33e48002c54"
 * }
 *
 * @apiSuccess {String} status Profile block search result
 * @apiSuccess {Object} profile contents of profile block
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *     "status": "Profile block has been successfully found",
 *     "itemblock": {
 *	        "urlProfile": "http://cloudinaryimage",
 *          "_id": "5f81bdf6db99e33e48002c11",
 *          "user_id": "5f81bdf6db99e33e48002c54",
 *          "title": "About Me",
 *          "aboutMe": "Hey, I'm ...",
 *          "date": "2020-10-10T13:58:14.064Z",
 *          "__v": 0	
 *     }
 * }
 *
 * @apiError RequiredDetailsMissing Required parameters not provided
 * 
 * @apiErrorExample Error-Response: 
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "Missing user id"
 * }
 */
router.use('/see', pblockController.checkSeeBody);
router.route('/see')
	.post(pblockController.seeProfile);

module.exports = router;