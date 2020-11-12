const router = require('express').Router();

const {
    login,
    signUp,
    getUserInfo,
    updateProfilePic,
    loadProfilePic,
    searchUser,
    getUserBio,
    updateBio,
    getSkills,
    addSkill,
    deleteSkill
} = require('../controllers/user');

//auth routes
router.post('/login', login);
router.post('/signup', signUp);
router.get('/:uid', getUserInfo);
router.post('/profilepic', updateProfilePic);
router.get('/profilepic/:uid', loadProfilePic);
router.post('/search', searchUser);
router.get('/bio/:uid', getUserBio);
router.post('/bio', updateBio);
router.get('/skills/:uid', getSkills);
router.post('/skills', addSkill);
router.delete('/skills/:uid/:idx', deleteSkill);

module.exports = router;