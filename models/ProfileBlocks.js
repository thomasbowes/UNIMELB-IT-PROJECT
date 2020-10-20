const mongoose = require('mongoose');

// user schema
const ProfileBlockSchema = new mongoose.Schema({
	// immutable attribute prevents value from being changed once set
    user_id: {type: mongoose.Types.ObjectId, required: true, immutable: true},
    title: {type: String, required: false},
    aboutMe: {type: String, required: false},
    // replace default value with cloudinary url
    urlProfile: {type: String, default: "https://res.cloudinary.com/dg3osx8ob/image/upload/v1602739213/defaultProfile_puyltp.png"},
    public_id: {type: String , required: false},
    date: {type: Date, default: Date.now, immutable: true}
}, {collection: 'profileblocks'});

const ProfileBlock = mongoose.model('ProfileBlock', ProfileBlockSchema);

module.exports = ProfileBlock;