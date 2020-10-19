const mongoose = require('mongoose');

const { cloudinary } = require('../config/cloudinary');

const File = require('../models/Files');

//delete a file by given a file_id
const deleteAFile = (req,res) => {

    const file_id = req.body.file_id;
    const user_id = req.user._id;
    const isAdmin = req.user.isAdmin;

    File
        .findById(file_id)
        .then(items => {

            if(items.user_id == user_id || isAdmin){

                deleteFileCloudinary(items.public_id, items.resource_type);
                File
                    .findByIdAndRemove(items._id)
                        .then( (response) => {
                            //console.log(response);
                                res.status(200).json({
                                    message: "The file have been successfully deleted"
                                })
                            }
                        );
            }else{
                res.status(401).json({
                    message: "unauthorized action",
                });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "An error has occurred, could not find file",
                err: error
            });
        });
}

//return all files given an item_id
const seeAllFiles = (req,res) => {

    const item_id = req.body.item_id;
    const query = { itemBlock_id: item_id };

    File
        .find(query)
        .then(result =>{
            res.status(200).json({
                message: "success found",
                files: result
            });
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                message: "error occurred, please try again",
            });

        });
}


//delete a file by given a file_id
const deleteAllFilesIn = (req,res) => {

    const user_id = req.user._id;
    const isAdmin = req.user.isAdmin;
    const item_id = req.body.item_id;

    //if it is admin no need to check if user_id match
    let query;
    if(isAdmin) query = { itemBlock_id: item_id };
    else query = { itemBlock_id: item_id, user_id: user_id};

    return new Promise((resolve, reject) => {

        File
            .find(query)
            .then(items => {

                //turn an array of dictionary of an attribute "public_id" into an array of public_id
                const all_public_id = items.map(({public_id}) => public_id);
                //turn an array of dictionary of an attribute "resource_type" into an array of resource_type
                const all_resource_type = items.map(({resource_type}) => resource_type);

                if(all_public_id.length !== all_resource_type.length){
                    reject();
                }


                for (let i = 0; i < all_public_id.length; i++){
                    deleteFileCloudinary(all_public_id[i], all_resource_type[i]);
                }

                //turn an array of dictionary of an attribute "public_id into" an array of public_id when resource_type = 'image'
                //const all_public_id_image = items.flatMap(({public_id, resource_type}) => resource_type === 'image' ? [] : public_id);
                //turn an array of dictionary of an attribute "public_id into" an array of public_id when resource_type = 'raw'
                //const all_public_id_raw = items.flatMap(({public_id, resource_type}) => resource_type === 'raw' ? [] : public_id);
                //turn an array of dictionary of an attribute "public_id into" an array of public_id when resource_type = 'video'
                //const all_public_id_video = items.flatMap(({public_id, resource_type}) => resource_type === 'video' ? [] : public_id);

                //console.log(all_public_id_image);
                //console.log(all_public_id_raw);
                //console.log(all_public_id_video);

                //perform delete form cloudinary
                //deleteManyFilesCloudinary(all_public_id_image, 'image');
                //deleteManyFilesCloudinary(all_public_id_raw, 'raw');
                //deleteFileCloudinary(all_public_id_video, 'video');

                //remove form DB
                File.deleteMany(query)
                    .catch(error => console.log(error));

                resolve();

            })
            .catch(error => {
                console.log(error);
                reject();
            });

    });
}

const deleteAllFiles = (req,res) => {

    deleteAllFilesIn(req, res)
        .then(()=>{
            res.status(200).json({
                message: "All files have been successfully deleted",
            });
        })
        .catch(() =>{
            res.status(500).json({
                message: "Error occur could not delete files, please try again",
            });
        });
}



const deleteFileCloudinary = (public_id, resource_type) => {

    cloudinary.uploader.destroy(public_id, {resource_type: resource_type}, function(error,result)
    {
        console.log(result, error);
    });
}


const deleteManyFilesCloudinary = (public_id, resource_type) => {

    cloudinary.api.delete_resources(public_id, {resource_type: resource_type}, function(error,result)
    {
        console.log(result, error);
    });
}

module.exports.deleteAFile = deleteAFile;
module.exports.seeAllFiles = seeAllFiles;
module.exports.deleteAllFiles = deleteAllFiles;