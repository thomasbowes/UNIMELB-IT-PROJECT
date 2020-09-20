const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../config/cloudinary');
const streamifier = require('streamifier');

const fileUpload = require('express-fileupload');

const UPLOAD_SIZE_LIMIT = 10000000;

// Item Model and Controller
const User = require('../../models/Users');
const usersController = require('../../controllers/usersController');


//upload function
let uploadFromBuffer = (files) => {

    return new Promise((resolve, reject) => {

        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: "project",
                resource_type: "auto",
                public_id: files.file.name
            },
            (error, result) => {

                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );

        streamifier.createReadStream(files.file.data).pipe(cld_upload_stream);
    });

};


router.route('/upload')
    .post((req, res) => {

        console.log(req.files.file)

        if(req.files.file.size > UPLOAD_SIZE_LIMIT)
        {
            res.status(413).json({
                status: 'excess file limit: max 10 mb',
                message: null
            });
            return;
        }


        uploadFromBuffer(req.files)
            .then( (result) => {
                console.log(result);
                res.status(201).json({
                    status: 'success uploaded',
                    message: null
                });
            })
            .catch( (error) => {
                console.log(error);
                res.status(500).json({
                    status: 'fail uploaded',
                    message: null
                });
            });
    });

module.exports = router;


