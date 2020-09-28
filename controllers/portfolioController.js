const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');

const UPLOAD_SIZE_LIMIT = 10000000;

//upload function form buffer since the file was from frontend
const uploadFromBuffer = (files) => {

    return new Promise((resolve, reject) => {

        //perform upload action
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            {
                //upload to project folder on Cloudinary
                folder: "project",
                //enable to upload any file type by setting type to auto
                resource_type: "auto",
                //set public_id to file name enable to stores the original name on Clodinary
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
        //perform upload
        streamifier.createReadStream(files.file.data).pipe(cld_upload_stream);
    });

};

const uploadFileToCloudinary = (req, res) => {

    console.log(req.files.file)

    //check size of the file
    if(req.files.file.size > UPLOAD_SIZE_LIMIT)
    {
        res.status(413).json({
            status: 'excess file limit: max 10 mb',
            message: null
        });
        return;
    }

    // return result to server
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
}

module.exports.uploadFileToCloudinary = uploadFileToCloudinary;