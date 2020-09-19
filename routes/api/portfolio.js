const express = require('express');
const router = express.Router();
const { cloudinary } = require('../../config/cloudinary');

const fileUpload = require('express-fileupload');

// Item Model and Controller
const User = require('../../models/Users');
const usersController = require('../../controllers/usersController');

router.route('/upload')
    .get( (req, res) => res.json({msg: 'success'}));



router.route('/upload')
    .post((req, res) => {

        //console.log(req.files.file);

        //cloudinary.uploader.upload_stream(req.files.file.data,
        //    function(error, result) {console.log(result, error)});

        console.log(req.files.file);


        cloudinary.uploader.upload_stream((result) => console.log(result))
            .end(req.files.file.data)

        res.json({msg: 'success'});

    });

module.exports = router;


