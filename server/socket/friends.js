const {User}  = require('../models/user');
const {FriendRequest} = require('../models/friendRequest');
const {Notification} = require('../models/notif');

const axios = require('axios');

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