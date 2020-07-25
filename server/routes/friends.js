const {FriendRequest} = require('../dbschemas');

const router = require('express').Router();

router.get('/requests/:uid', (req, res) =>{
    const {uid} = req.params;
    
    FriendRequest.find({receiverId: uid}).then(result =>{
        result.sort((a, b) => b.date - a.date);
        res.json(result);
    });
});




module.exports = router;