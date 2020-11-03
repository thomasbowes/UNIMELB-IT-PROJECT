const express = require('express');
const router = express.Router();

const filesController = require('../../controllers/filesController');
const authMiddleware = require('../../middleware/authorization');

/**
 * @api {post} /deleteAll deletes all files by item_id
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
 *     "message": "All files have been successfully deleted"
 * }
 *
 * @apiError Action_failed fail to perform action
 * @apiErrorExample Action_failed:
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "Error occur could not delete files, please try again"
 * }
 *
 * @apiError Unauthorized invalid user token
 * @apiErrorExample Unauthorized:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Token is invalid",
 *     "status": false
 * }
 *
 */
router.use('/deleteAll', authMiddleware.authenticateJWT);
router.route('/deleteAll')
    .post(filesController.deleteAllFiles);

//need change file_id
/**
 * @api {post} /delete deletes a file by file_id
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
 * @apiError Action_failed fail to perform action
 * @apiErrorExample Action_failed:
 * HTTP/1.1 500  Internal Server Error
 * {
 *     "message": "An error has occurred, could not find file"
 * }
 *
 * @apiError User_id_not_match user_id not equal to the id in DB
 * @apiErrorExample Unauthorized:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "unauthorized action"
 * }
 *
 * @apiError Unauthorized invalid user token
 * @apiErrorExample Unauthorized:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Token is invalid",
 *     "status": false
 * }
 *
 */
router.use('/delete', authMiddleware.authenticateJWT);
router.route('/delete')
    .post(filesController.deleteAFile);


//need to change Successful Response:
/**
 * @api {post} /seeAll get all files by item_id
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
 *     "files": [
 *          {
 *              "_id": "5f8da29fe794779e98fa1032",
 *              "user_id": "5f7962230b1b514af41ffa3a",
 *              "itemBlock_id": "5f81bdf6db99e33e48002c54",
 *              "title": "dummy.pdf",
 *              "mimetype": "application/pdf",
 *              "size": 13264,
 *              "urlCloudinary": "https://res.cloudinary.com/dg3osx8ob/image/upload/v1603117727/project/dummy_b08tr5.pdf",
 *              "resource_type": "image",
 *              "public_id": "project/dummy_b08tr5",
 *              "date": "2020-10-19T14:28:47.493Z",
 *              "__v": 0
 *           },
 *           {
 *              "_id": "5f8da29fe794779e98fa1033",
 *              "user_id": "5f7962230b1b514af41ffa3a",
 *              "itemBlock_id": "5f81bdf6db99e33e48002c54",
 *              "title": "smaple file.txt",
 *              "mimetype": "text/plain",
 *              "size": 11,
 *              "urlCloudinary": "https://res.cloudinary.com/dg3osx8ob/raw/upload/v1603117728/project/smaple_file_kogyx0.txt",
 *              "resource_type": "raw",
 *              "public_id": "project/smaple_file_kogyx0.txt",
 *              "date": "2020-10-19T14:28:47.895Z",
 *              "__v": 0
 *            }
 *      ]
 * }
 *
 * @apiError Internal_Server_Error unable to process
 * @apiErrorExample Internal_Server_Error:
 * HTTP/1.1 500 Internal Server Error
 * {
 *     message: "error occurred, please try again"
 * }
 */
router.route('/seeAll')
    .post(filesController.seeAllFiles);


module.exports = router;

