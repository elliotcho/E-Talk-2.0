const {User, FriendRequest} = require('../dbschemas');

const router = require('express').Router();

router.get('/:uid', (req, res) =>{
    const {uid} = req.params;

    User.findOne({_id: uid}).then(user =>{
        User.find({_id: {$in: user.friends}}).then(result =>{
            result.sort((a, b) => a.firstName[0] - b.firstName[0]);
            res.json(result);
        });
    });
});

router.get('/requests/:uid', (req, res) =>{
    const {uid} = req.params;
    
    FriendRequest.find({receiverId: uid}).then(result =>{
        result.sort((a, b) => b.date - a.date);
        res.json(result);
    });
});

module.exports = router; 