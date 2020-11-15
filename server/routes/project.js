const router = require('express').Router();

const {
    getProjectById,
    createProject,
    getUserProjects,
    updateProject,
    deleteProject,
} = require('../controllers/project');

router.get('/:id', getProjectById);
router.post('/', createProject);
router.get('/user/:uid', getUserProjects);
router.post('/update', updateProject);
router.delete('/:projectId', deleteProject);

module.exports= router;