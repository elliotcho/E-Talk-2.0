const router = require('express').Router();

const {
    login,
    signUp,
    getUserInfo,
    updateProfilePic,
    loadProfilePic,
    searchUser
} = require('../controllers/user');

//auth routes
router.post('/login', login);
router.post('/signup', signUp);
router.get('/:uid', getUserInfo);
router.post('/profilepic', updateProfilePic);
router.get('/profilepic/:uid', loadProfilePic);
router.post('/search', searchUser);

const {User} = require('../models/user');
router.post('/pwd',async (req, res) =>{
    const {uid, pwd} = req.body;

    await User.updateOne({_id: uid}, {password: pwd});

    res.json({msg: "DONE"});
});

module.exports = router;