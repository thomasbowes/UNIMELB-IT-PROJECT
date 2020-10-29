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
    // title field can also be substituted by role or degree
    title: {type: String, required: true},
    description: {type: String, required: false},
    // replace default value with cloudinary url
    urlThumbnail: {type: String, required: true, default: "https://res.cloudinary.com/dg3osx8ob/image/upload/v1602739213/defaultItemBlock_drwafh.png"},
    public_id: {type: String, required: false},
    date: {type: Date, default: Date.now, immutable: true},
    // latest new attributes (there's an alternate way to seperate attributes to certain types
    // but that requires changing stuff so best not for now)
    startDate: {type: String, default:'2020',  required: false},
    endDate: {type: String, default:'2020', required: false},
    organisation: {type: String, required: false}
}, {collection: 'itemblocks'});

const ItemBlock = mongoose.model('ItemBlock', ItemBlockSchema);

module.exports = ItemBlock;
