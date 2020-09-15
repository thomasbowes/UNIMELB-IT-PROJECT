const mongoose = require('mongoose');

// user schema
const UserSchema = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, required: false},
    email: {type: String, required: true},
    confirm: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    date: {type: Date, default: Date.now}
}, {collection: 'users'});

const User = module.exports = mongoose.model('User', UserSchema);