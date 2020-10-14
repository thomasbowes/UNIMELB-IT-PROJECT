const mongoose = require('mongoose');

// File Schema
const FileSchema = new mongoose.Schema({
    user_id: {type: mongoose.Types.ObjectId, required: true},
    itemBlock_id: {type: mongoose.Types.ObjectId, require: true},
    title: {type: String, required: true},
    mimetype: {type: String, require: true},
    size: {type: Number, required: true},
    urlCloudinary: {type: String, required: true},
    resource_type: {type: String, required: true},
    date: {type: Date, default: Date.now},
}, {collection: 'files'});

const File = mongoose.model('File', FileSchema);

module.exports = File;