const mongoose = require('mongoose');

// user schema
const ItemBlockSchema = new mongoose.Schema({
	// immutable attribute prevents value from being changed once set
    user_id: {type: mongoose.Types.ObjectId, required: true, immutable: true},
    type: {
    	type: String,
    	enum: ['Job', 'Education', 'Project'],
    	required: true,
    	immutable: true
    },
    title: {type: String, required: true},
    description: {type: String, required: false},
    // replace default value with cloudinary url
    urlThumbnail: {type: String, default: "Thumbnail"},
    date: {type: Date, default: Date.now, immutable: true}
}, {collection: 'itemblocks'});

const ItemBlock = mongoose.model('ItemBlock', ItemBlockSchema);

module.exports = ItemBlock;