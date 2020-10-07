const mongoose = require('mongoose');

// user schema
const ProjectSchema = new mongoose.Schema({
    description: {type: String, require: false},
    name: {type: String, require: true},
    user_id: {type: ObjectId, required: true},
    date: {type: Date, default: Date.now}
}, {collection: 'projects'});

const Project = mongoose.model('User', ProjectSchema);

module.exports = Project;