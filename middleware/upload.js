const { cloudinary } = require('../config/cloudinary');
const streamifier = require('streamifier');
const UPLOAD_SIZE_LIMIT = 10000000;

//to distinguish between different type of upload
const ITEMBLOCK = 'ItemBlock';
const FILE = 'File';
const USER = 'User';

//bring in mongoDB collections
const ItemBlock = require('mongoose').model('ItemBlock');
const ProfileBlock = require('mongoose').model('ProfileBlock');


const uploadFileVerify = (req, res, next) =>{

    //get all the info form frontend
    const user_id = req.user._id;
    const itemBlock_id = req.body.itemBlock_id;
    const type = req.body.type;

    //check if type === File
    if(type === FILE){
        //error when:
        //user_id or itemBlock_id is absence
        //user_id in Itemblock != user_id in token or Itemblock is absence

        if(user_id === 'undefined' || itemBlock_id === 'undefined'){
            res.status(400).json({
                message: 'Error Found: Missing info - fail to create files, please refresh the web page and try again',
                status: false
            });
        }
        else{
            itemBlockVerify(itemBlock_id, user_id)
                .then(
                    next
                )
                .catch(()=>{
                    res.status(400).json({
                        message: 'Error Found - Not authorise',
                        status: false
                    });
                });
        }
    }
    //check if type === ItemBlock
    else if(type === ITEMBLOCK){
        //error when:
        //user_id or itemBlock_id is absence
        //user_id in Itemblock != user_id in token or Itemblock is absence

        if(user_id === 'undefined' || itemBlock_id === 'undefined'){
            res.status(400).json({
                message: 'Error Found: Missing info - fail to upload thumbnail, please refresh the web page and try again',
                status: false
            });
        }
        else{
            itemBlockVerify(itemBlock_id, user_id)
                .then(
                    next
                )
                .catch(()=>{
                    res.status(400).json({
                        message: 'Error Found - Not authorise',
                        status: false
                    });
                });
        }
    }
    //check if type === User
    else if(type === USER){
        //error when:
        //user_id is absence
        //user_id in Profile != user_id in token or Profile is absence

        if(user_id === 'undefined'){
            res.status(400).json({
                message: 'Error Found - fail to upload image to profile, please refresh the web page and try again',
                status: false
            });
        }
        else{
            profileBlockVerify(user_id)
                .then(
                    next
                )
                .catch(()=>{
                    res.status(400).json({
                        message: 'Error Found - Not authorise',
                        status: false
                    });
                });
        }
    }
    //if no match
    else{
        res.status(400).json({
            message: 'type not match, unable to process, please refresh the web page and try again',
            status: false
        });
    }
}

//verify if the user_id in ItemBlock === to the user_id in the given token
//also if the itemblock is absence or not
//return a promise resolve when verify pass
const itemBlockVerify = (itemBlock_id, user_id) => {

    return new Promise((resolve, reject) => {
        const query = {_id: itemBlock_id};

        ItemBlock
            .findOne(query)
            .then(items => {
                if (items.user_id == user_id){
                    resolve();
                }
                reject();
            })
            .catch(error => {
                reject();
            })
    });
}


//verify if the user_id in profileBlock === to the user_id in the given token
//also if the profileBlock is absence or not
//return a promise resolve when verify pass
const profileBlockVerify = (user_id) => {

    return new Promise((resolve, reject) => {
        const query = {user_id: user_id};

        ProfileBlock
            .findOne(query)
            .then(items => {
                if (items.user_id == user_id) resolve();
                reject();
            })
            .catch(error => {
                reject();
            })
    });
}


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
                title: req.files.file.name,
                size: req.files.file.size,
                encoding: req.files.file.encoding,
                mimetype: req.files.file.mimetype,
                md5: req.files.file.md5,
                resource_type: result.resource_type,
                created_at: result.created_at,
                urlCloudinary: result.secure_url,
                public_id: result.public_id
            };

            next();

        })
        .catch( (error) => {
            console.log(error);
            res.status(500).json({
                message: 'fail uploaded'
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
                //set public_id to file name enable to stores the original name + uniqueID on Clodinary
                use_filename: true,
                filename: files.file.name,
                unique_filename: true,
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

//add delete from cloud
//add verify user_id === user+id
//make <upload> more options

module.exports = {uploadFileToCloudinary, uploadFileVerify};