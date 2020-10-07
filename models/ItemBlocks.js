const mongoose = require('mongoose');

// user schema
const ItemBlockSchema = new mongoose.Schema({
    user_id: {type: ObjectId, required: true},
    project_id: {type: ObjectId, require: true},
    name: {type: String, required: true},
    description: {type: String, required: false},
    date: {type: Date, default: Date.now}
}, {collection: 'ItemBlocks'});

const ItemBlock = mongoose.model('ItemBlock', ItemBlockSchema);

module.exports = ItemBlock;