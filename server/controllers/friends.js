const {User} = require('../models/user');
const {FriendRequest} = require('../models/friendRequest');
const {Notification} = require('../models/notif');

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

exports.acceptFriendReq = async (req, res) => {
    const {clientStatus, serverStatus, receiverId, senderId} = req.body;

    if(clientStatus === serverStatus && clientStatus === 'Pending'){
        await FriendRequest.deleteOne({receiverId: receiverId, senderId: senderId});
        await FriendRequest.deleteOne({receiverId: senderId, senderId: receiverId});

        const receiver = await User.findOne({_id: receiverId});

        await User.updateOne(
            {_id: receiverId}, 
            {friends: [...receiver.friends, senderId]
        });

        const sender = await User.findOne({_id: senderId});

        await User.updateOne(
            {_id: senderId},
            {friends: [...sender.friends, receiverId]
        });

        const newNotification = new Notification({
            receiverId: senderId,
            senderId: receiverId,
            postId: null, 
            date: new Date(),
            seen: false,
            msg: 'accepted your friend request!',
            type: 'ACCEPT_REQUEST'
        });

        await newNotification.save();

        res.json({msg: 'Friend request accepted'});
    }

    else{
        res.json({msg: null});
    }
}

exports.declineFriendReq = async (req, res) => {
    const {receiverId, senderId} = req.body;

    await FriendRequest.deleteOne({receiverId, senderId});

    res.json({msg: 'Friend request declined'});
}

exports.changeFriendStatus = async (req, res) => {
    const {clientStatus, serverStatus, senderId, receiverId} = req.body;

    if(clientStatus === serverStatus){
        if(clientStatus === 'Add Friend'){
            const newFriendRequest = new FriendRequest({
                senderId,
                receiverId,
                date: new Date(),
                seen: false
            });

            await newFriendRequest.save();

            res.json({msg: 'Friend request sent'});
        }

        else if(clientStatus === 'Pending'){
            await FriendRequest.deleteOne({receiverId, senderId});

            res.json({
                msg: 'Friend request cancelled'
            });
        }

        else{
            const receiver = await User.findOne({_id: receiverId});

            const receiverFriends = receiver.friends;

            for(let i=0;i<receiverFriends.length;i++){
                if(receiverFriends[i] === senderId){
                    receiverFriends.splice(i, 1);
                    break;
                }
            }

            await User.updateOne({_id: receiverId}, {friends: receiverFriends});

            const sender = await User.findOne({_id: senderId});

            const senderFriends = sender.friends;

            for(let i=0;i<senderFriends.length;i++){
                if(senderFriends[i] === receiverId){
                    senderFriends.splice(i, 1);
                    break;
                }
            }

            await User.updateOne({_id: senderId}, {friends: senderFriends});

            await Notification.deleteOne({receiverId: receiverId, senderId: senderId, type: 'ACCEPT_REQUEST'});
            await Notification.deleteOne({receiverId: senderId, senderId: receiverId, type: 'ACCEPT_REQUEST'});

            res.json({msg: 'Friend deleted'});
        }
    }
}