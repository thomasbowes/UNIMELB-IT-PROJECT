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













const deleteFileCloudinary = (public_id, resource_type) => {

    cloudinary.uploader.destroy(public_id, {resource_type: resource_type}, function(error,result)
    {
        console.log(result, error);
    });
}

module.exports.deleteAFile = deleteAFile;
module.exports.seeAllFiles = seeAllFiles;