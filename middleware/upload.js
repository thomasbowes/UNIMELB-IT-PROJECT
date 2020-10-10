const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');
const UPLOAD_SIZE_LIMIT = 10000000;

const uploadFileVerify = (req, res, next) =>{
    const user_id = req.body.user_id;
    const itemBlock_id = req.body.itemBlock_id;

    if(user_id === 'null' || itemBlock_id === 'null'){
        res.status(400).json({
            message: 'missing information, unable to process, please refresh the web page and try again',
            status: false
        });
        return;
    }





    next();
}

//status: 'missing information, unable to process, please refresh the web page and try again',
//    message: null,








// a middleware used to upload file to Cloudinary and return the file info
const uploadFileToCloudinary = (req, res, next) => {

    //console.log(req.body);

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

            //console.log(result);
            req.upload_file = {
                name: req.files.file.name,
                size: req.files.file.size,
                encoding: req.files.file.encoding,
                mimetype: req.files.file.mimetype,
                md5: req.files.file.md5,
                resource_type: result.resource_type,
                created_at: result.created_at,
                secure_url: result.secure_url
            };

            next();

        })
        .catch( (error) => {
            console.log(error);
            res.status(500).json({
                status: 'fail uploaded',
                message: null
            });
        });
};

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

module.exports = {uploadFileToCloudinary, uploadFileVerify};