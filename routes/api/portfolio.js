const express = require('express');
const router = express.Router();
const passport = require('passport');

//Middleware
const uploadMiddleware = require('../../middleware/upload');

// Add auth middleware
const authMiddleware = require('../../middleware/authorization');

// Item Model and Controller
const portfolioController = require('../../controllers/portfolioController');


/**
 * @api {post} /upload upload a file
 * @apiName Upload
 * @apiGroup portfolio
 *
 * @apiParam {Object} The file that you want to upload
 * @apiParam {String} The type of the upload File/ItemBlock/User
 * @apiParam {String} item_id ID of an item block you're trying to delete, only require if type = File/ItemBlock
 *
 * @apiParamExample Example Body:
 * {
 *     body:{
 *          itemBlock_id: '5f994b059da95f0017bee607',
 *          type: 'File'
 *     },
 *     files:{
 *          files:{
 *              name: '3.jpg',
 *              data: <Buffer ff d8 ff e0 00 10 4a 46  ... 57394 more bytes>,
 *              size: 57444,
 *              encoding: '7bit',
 *              tempFilePath: '',
 *              truncated: false,
 *              mimetype: 'image/jpeg',
 *              md5: 'c18c0f04491aeb3ecd8fe0ef0abeec53',
 *              mv: [Function: mv]
 *          }
 *     }
 *
 * }
 *
 * @apiSuccess {String} message upload successful message
 * @apiSuccess {Object} If type = 'File', return File object
 * @apiSuccess {Object} If type = 'ItemBlock'/'User', return updated 'ItemBlock'/'User' object
 *
 * @apiSuccessExample Successful Response if type = "File":
 * HTTP/1.1 200
 * {
 *     "message": "file success uploaded",
 *     "item": {
 *         _id:1f94fcf7bc27e50017b15e6f,
 *         user_id:1f944e0a10110b068cb2260d,
 *         itemBlock_id:1f94509f97b28d2c086fa5cd,
 *         title:"sample_image - Copy (2).jpg"
 *         mimetype:"image/jpeg",size:4647,
 *         urlCloudinary:"https://res.cloudinary.com/dg3osx8ob/image/upload/v1234567/project/...",
 *         resource_type:"image",
 *         public_id:"project/download_api",
 *         date:2020-10-25T04:20:07.963+00:00,
 *         __v:0
 *     }
 * }
 *
 * @apiSuccessExample Successful Response if type = "ItemBlock":
 * HTTP/1.1 200
 * {
 *     "message": "Item blocks: image added",
 *     "item": {
 *          _id:5f944eeed37882311c479633,
 *          urlThumbnail:"https://res.cloudinary.com/dg3osx8ob/image/upload/v12234589/...",
 *          type:"Education",
 *          title:"title",
 *          user_id:5v944e0a10110b068cb2260d,
 *          date:2020-10-24T15:57:34.410+00:00,
 *          __v:0,
 *          endDate:"1980",
 *          organisation:"organisation",
 *          startDate:"1979",
 *          public_id:"project/download_api",
 *          description:""
 *     }
 * }
 *
 * @apiSuccessExample Successful Response if type = "User":
 * HTTP/1.1 200
 * {
 *     "message": "user profile: image added",
 *     "item": {
 *          _id:1f944e0a10110b098cb2260e,
 *          urlProfile:"https://res.cloudinary.com/dg3osx8ob/image/upload/v1234567/project/...",
 *          user_id:6f944e0a10110b078ch2260d,
 *          name:"Name",
 *          email:"api@api.com",
 *          date:2020-10-24T15:53:46.383+00:00,
 *          __v:0,
 *          public_id:"project/download_api",
 *          aboutMe:" about me about me about me...",
 *          location:"api location",
 *          phone:"0123456789",
 *          title:"title",
 *          website:"http://localhost:3000/api/api"
 *     }
 * }
 *
 * @apiError JWT isn't valid
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Token provided is invalid",
 *     "status": false
 * }
 *
 * @apiError Incorrect item_id, could not find ItemBlock
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "An error has occurred, could not find ItemBlock",
 *     "err": error
 * }
 *
 * @apiError Could not create new file object
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "An error has occurred, could not create newFile object!",
 *     "err": error
 * }
 *
 * @apiError Incorrect user_id
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": "An error has occurred, please try again",
 *     "err": error
 * }
 *
 * @apiError Missing user_id/itemBlock_id
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *     "message": "Error Found: - ...",
 *     "status": false
 * }
 *
 * @apiError Info not match user id in token does not match user id in database
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "message": "Error Found - Not authorise",
 *     "status": false
 * }
 *
 * @apiError Excess file size limit
 * @apiErrorExample Error-Response:
 * HTTP/1.1 401 Unauthorized
 * {
 *     "status": "excess file limit: max 10 mb",
 *     "message": null
 * }
 *
 * @apiError Fail to upload to Cloudinary
 * @apiErrorExample Error-Response:
 * HTTP/1.1 500 Internal Server Error
 * {
 *     "message": 'fail uploaded'
 * }
 *
 * @apiError Type not match
 * @apiErrorExample Error-Response:
 * HTTP/1.1 400 Bad Request
 * {
 *     "message": 'type not match, unable to process, please refresh the web page and try again',
 *     "status": false
 * }
 */


router.use('/upload', authMiddleware.authenticateJWT);
router.use('/upload', uploadMiddleware.uploadFileVerify);
router.use('/upload', uploadMiddleware.uploadFileToCloudinary);
router.route('/upload')
    .post(portfolioController.uploadFileToMongoDB);

module.exports = router;


