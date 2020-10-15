const mongoose = require('mongoose');

// user schema
const UserSchema = new mongoose.Schema({
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    password: {type: String, required: false},
    facebookID: {type: String, required: false, immutable: true},
    googleID: {type: String, required: false, immutable: true},
    email: {type: String, required: true, immutable: true},
    confirm: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false, immutable: true},
    date: {type: Date, default: Date.now, immutable: true}
}, {collection: 'users'});

const User = mongoose.model('User', UserSchema);

module.exports = User;