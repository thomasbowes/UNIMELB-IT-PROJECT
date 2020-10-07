const mongoose = require('mongoose');

// user schema
const ItemBlockSchema = new mongoose.Schema({
    project_id: {type: ObjectId, require: true},
    mimetype: {type: String, require: true},
    size: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    date: {type: Date, default: Date.now}
}, {collection: 'ItemBlocks'});

const ItemBlock = mongoose.model('User', ItemBlockSchema);

module.exports = ItemBlock;