const {User}  = require('../models/user');
const {FriendRequest} = require('../models/friendRequest');
const {Notification} = require('../models/notif');

const axios = require('axios');

exports.declineRequest = async (data) =>{
    const {
        receiverId, 
        senderId
    } = data;

    await FriendRequest.deleteOne({receiverId, senderId});
}

exports.acceptRequest = async (data) =>{
    const {status, receiverId, senderId} = data;

    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.post('http://localhost:5000/friends/status', {senderId, receiverId}, config);

    if(status === response.data.status && status === 'Pending'){
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

        return true;
    }
}

exports.changeFriendStatus = async (data) =>{
    const {status, senderId, receiverId} = data;

    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.post('http://localhost:5000/friends/status', {senderId, receiverId}, config);

    if(status === response.data.status){
        if(status === 'Add Friend'){
            const newFriendRequest = new FriendRequest({
                senderId,
                receiverId,
                date: new Date(),
                seen: false
            });

            await newFriendRequest.save();

            return true;
        }

        else if(status === 'Pending'){
            await FriendRequest.deleteOne({receiverId, senderId});
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
        }
    }
}