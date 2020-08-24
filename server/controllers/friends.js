const {User} = require('../models/user');
const {FriendRequest} = require('../models/friendRequest');

exports.getUserFriends = async (req, res) =>{
    const {profileId} = req.params;

    const user = await User.findOne({_id: profileId});
    const friends = await User.find({_id: {$in: user.friends}});

    friends.sort((a, b) => a.firstName === b.firstName? 
        a.lastName - b.lastName: 
        a.firstName - b.firstName
    );

    res.json(friends);
}

exports.getFriendStatus = async (req, res)=>{
    const {senderId, receiverId} = req.body;

    const fr = await FriendRequest.findOne({senderId, receiverId});

    if(fr !== null){
        res.json({status: 'Pending'});
    }

    else{
        const user = await User.findOne({_id: receiverId});

        if(user.friends.includes(senderId)){
            res.json({status: 'Friends'});
        }

        else{
            res.json({status: 'Add Friend'});
        }
    }
}

exports.getUnreadFriendRequests = async (req, res) =>{
    const {uid} = req.params;

    const fr = await FriendRequest.find({receiverId: uid});

    const requests = fr.filter(request =>
        request.seen === false
    );

    res.json({unreadRequests: requests.length});
}

exports.readFriendRequests = async (req, res) =>{
    const {uid} = req.params;

    await FriendRequest.updateMany({receiverId: uid}, {seen: true});

    const requests = await FriendRequest.find({receiverId: uid});
    requests.sort((a, b) => b.date - a.date);

    res.json(requests);
}