const mongoose = require('mongoose');

// user schema
const ProjectSchema = new mongoose.Schema({
    user_id: {type: ObjectId, required: true},
    userFirstname: {type: String, require: true},
    userLastname: {type: String, require: true},
    userEmail: {type: String, require: true},
    name: {type: String, require: true},
    description: {type: String, require: false},
    date: {type: Date, default: Date.now}
}, {collection: 'projects'});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;