const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    name: String,
    description: String,
    uid: String,
    createdAt: Date
});

exports.Project = mongoose.model('project', ProjectSchema);