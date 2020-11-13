const router = require('express').Router();

const {
    createProject,
    getUserProjects,
    updateProject,
    deleteProject
} = require('../controllers/project');

router.post('/', createProject);
router.get('/:uid', getUserProjects);
router.post('/update', updateProject);
router.delete('/:projectId', deleteProject);

module.exports= router;