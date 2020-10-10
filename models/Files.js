const mongoose = require('mongoose');

// user schema
const FileSchema = new mongoose.Schema({
    user_id: {type: ObjectId, required: true},
    project_id: {type: ObjectId, require: true},
    itemBlock_id: {type: ObjectId, require: true},
    name: {type: String, required: true},
    mimetype: {type: String, require: true},
    size: {type: String, required: true},
    secure_url: {type: String, required: true},
    md5: {type: String, required: true},
    resource_type: {type: String, required: true},
    date: {type: Date, default: Date.now},
}, {collection: 'Files'});

const File = mongoose.model('File', FileSchema);

module.exports = File;