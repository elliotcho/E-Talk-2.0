const {Project} = require('../models/project');

exports.getProjectById = async (req, res) => {
    const {id} = req.params;

    const project = await Project.findOne({_id: id});
    
    res.json(project);
}

exports.createProject = async (req, res) => {
    const {name, description, uid} = req.body;

    const newProject = new Project({
        name,
        description,
        uid,
        createdAt: new Date()
    });

    const project = await newProject.save();

    res.json(project);
}

exports.getUserProjects = async (req, res) => {
    const {uid} = req.params;

    const projects = await Project.find({uid});
    
    projects.sort((a, b) => b.createdAt - a.createdAt);
    res.json(projects);
}

exports.updateProject = async (req, res) => {
    const {projectId, name, description} = req.body;

    await Project.updateOne({_id: projectId}, {name, description});

    res.json({msg: 'Success'});
}

exports.deleteProject = async (req, res) => {
    const {projectId} = req.params;

    await Project.deleteOne({_id: projectId});

    res.json({msg: 'Success'});
}