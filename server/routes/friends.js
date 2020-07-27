const {User, FriendRequest} = require('../dbschemas');

const router = require('express').Router();

router.get('/:profileId', (req, res) =>{
    const {profileId} = req.params;

    User.findOne({_id: profileId}).then(user =>{
        User.find({_id: {$in: user.friends}}).then(result =>{
            result.sort((a, b) => a.firstName[0] - b.firstName[0]);
            res.json(result);
        });
    });
});

router.post('/status', (req, res)=>{
    const {senderId, receiverId} = req.body;

    FriendRequest.findOne({senderId, receiverId}).then(result=>{
        if(result !== null){
            res.json({status: "Pending"});
        }

        else{
            User.findOne({_id: receiverId}).then(user =>{
                if(user.friends.includes(senderId)){
                    res.json({status: "Friends"});
                }
    
                else{
                    res.json({status: "Add Friend"});
                }
            });
        }
    });
});

router.get('/requests/:uid', (req, res) =>{
    const {uid} = req.params;
    
    FriendRequest.find({receiverId: uid}).then(result =>{
        result.sort((a, b) => b.date - a.date);
        res.json(result);
    });
});

router.get('/unreadrequests/:uid',  (req, res) =>{
    const {uid} = req.params;

    FriendRequest.find({receiverId: uid}).then(result =>{
        const requests = result.filter(request =>{
            return request.seen === false
        });

        res.json({unreadRequests: requests.length});
    });
});

router.put('/readrequests/:uid', (req, res) =>{
    const {uid} = req.params;

    FriendRequest.updateMany({receiverId: uid}, {seen: true}).then(() =>{
        FriendRequest.find({receiverId: uid}).then(result =>{
            res.json(result);
        });
    });
});

module.exports = router; 