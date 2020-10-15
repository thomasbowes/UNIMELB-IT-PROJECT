const mongoose = require('mongoose');
const { cloudinary } = require('../config/cloudinary');

//bring in mongoDB collection
const ItemBlock = require('mongoose').model('ItemBlock');
const User = require('mongoose').model('User');
//const File = require('mongoose').model('File');
const File = require('../models/Files');

//to distinguish between different type of upload
const ITEMBLOCK = 'ItemBlock';
const FILE = 'File';
const USER = 'User';

const uploadFileToMongoDB = (req, res) =>{
    //get all the info
    const type = req.body.type;
    //check if type === File
    if(type === FILE) createFiles(req, res);
    //check if type === ItemBlock
    if(type === ITEMBLOCK) uploadItemBlock(req, res);
    //check if type === User
    if(type === USER) uploadProfileBlock(req, res);
}


// function for creating a new file
const createFiles = (req, res) => {

    const user_id = req.user._id;
    const itemBlock_id = req.body.itemBlock_id;

    const newFile = new File({
        user_id: user_id,
        itemBlock_id: itemBlock_id,
        title: req.upload_file.title,
        mimetype: req.upload_file.mimetype,
        size: req.upload_file.size,
        urlCloudinary: req.upload_file.urlCloudinary,
        resource_type: req.upload_file.resource_type
    });

    newFile
        .save()
        .then(() => {
            res.status(201).json({
                message: "file success uploaded",
                item: newFile
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error has occurred, could not create newFile object!",
                err: error
            });
        });
};

// function for update image in ItemBlock
const uploadItemBlock = (req, res) => {

    const itemBlock_id = req.body.itemBlock_id;
    const query = { _id: itemBlock_id };
    ItemBlock
        .findOne(query)
        .then(items => {
            items.urlThumbnail = req.upload_file.urlCloudinary;
            items.save();
            res.status(200).json({
                message: "Item blocks: image added",
                itemblocks: items
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "An error has occurred, could not find ItemBlock",
                err: error
            });
        })
};

/*
// function for update image in ProfileBlock
const uploadProfileBlock = (req, res) => {

    const user_id = req.body.user_id;
    const query = { user_id: user_id };
    ProfileBlock
        .findOne(query)
        .then(items => {
            items.urlProfile = req.upload_file.urlCloudinary;
            items.save();
            res.status(200).json({
                status: "user profile: image added",
                itemblocks: items
            });
        })
        .catch(error => {
            res.status(500).json({
                status: "An error has occurred, please try again",
                err: error
            });
        })


};

 */
const uploadProfileBlock = (req, res) => {
    res.status(500).json({
        message: "An error has occurred, please try again",
    });
}


const deleteFileCloudinary = (public_id) => {
    cloudinary.v2.uploader.destroy(public_id, function(error,result)
    {
        if(error) console.log(error);
    });
}


module.exports.uploadFileToMongoDB = uploadFileToMongoDB;