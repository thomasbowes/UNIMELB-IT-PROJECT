const express = require('express');
const router = express.Router();

const filesController = require('../../controllers/filesController');
const authMiddleware = require('../../middleware/authorization');

/**
 * @api {post} /deleteAll deletes all files from our database
 * @apiName DeleteAllFiles
 * @apiGroup Files
 *
 * @apiParam {String} item_id ID of an item block you're trying to delete, REQUIRED
 *
 * @apiParamExample Example Body:
 * {
 *     "item_id": "lkjalksfi98789348915987897"
 * }
 *
 * @apiSuccess {String} status all files deletion result
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *     "status": "All files have been successfully deleted"
 * }
 *
 * @apiError RequiredDetailsMissing Required parameters not provided
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "Missing  item id"
 * }
 */
router.use('/deleteAll', authMiddleware.authenticateJWT);
router.route('/deleteAll')
    .post();

//need change file_id
/**
 * @api {post} /delete deletes a file from our database
 * @apiName DeleteFile
 * @apiGroup Files
 *
 * @apiParam {String} file_id ID of the file you're trying to delete, REQUIRED
 *
 * @apiParamExample Example Body:
 * {
 *     "file_id": "yopjlesfi98789348915657897"
 * }
 *
 * @apiSuccess {String} status a file deletion result
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *     "message": "The file have been successfully deleted"
 * }
 *
 * @apiError RequiredDetailsMissing Required parameters not provided
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "Missing file id"
 * }
 */
router.use('/delete', authMiddleware.authenticateJWT);
router.route('/delete')
    .post(filesController.deleteAFile);


//need to change Successful Response:
/**
 * @api {post} /seeAll get all relevant files by given an itemBlock id from our database
 * @apiName SeeAllFiles
 * @apiGroup Files
 *
 * @apiParam {String} item_id ID of an item block you're trying to see, REQUIRED
 *
 * @apiParamExample Example Body:
 * {
 *     "item_id": "lkjalksfi98789348915987897"
 * }
 *
 * @apiSuccess {String} status files search result
 * @apiSuccess {Object} flies list of files
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *     "status": "Item block has been successfully found",
 *     "itemblocks": [
 *	 	    {
 *	  	        "urlThumbnail": "Thumbnail",
 *	 	        "_id": "5f81bdf6db99e33e48002c54",
 * 	 	        "user_id": "5f7a7f7240e08a0017990a5e",
 *	 	        "type": "Project",
 *	 	        "title": "Test",
 *	 	        "description": "",
 * 	 	        "date": "2020-10-10T13:58:14.064Z",
 *	  	        "__v": 0
 *	 	    },
 *	 	    {
 *	 	        "urlThumbnail": "Thumbnail",
 *	 	        "_id": "5f81bdfedb99e33e48002c55",
 *	 	        "user_id": "5f7a7f7240e08a0017990a5e",
 *	 	        "type": "Education",
 *	 	        "title": "Test 2",
 *	 	        "description": "",
 *	 	        "date": "2020-10-10T13:58:22.794Z",
 *	 	        "__v": 0
 *	 	    }
 *      ]
 * }
 *
 * @apiError RequiredDetailsMissing Required parameters not provided
 *
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "Missing  item id"
 * }
 */
router.use('/seeAll', authMiddleware.authenticateJWT);
router.route('/seeAll')
    .post(filesController.seeAllFiles);


module.exports = router;

