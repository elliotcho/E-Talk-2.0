const {User, FriendRequest} = require('./dbschemas');
const axios = require('axios');

const active = {};

module.exports = (io) =>{
    io.on('connection', socket=>{
        socket.on('USER_AUTHENTICATED', data =>{
            active[data.uid] = socket.id;
        });
 
        socket.on('LOGOUT', data =>{ 
            delete active[data.uid];
        });

        socket.on('DECLINE_REQUEST', data =>{
            const {receiverId, senderId} = data;

            FriendRequest.deleteOne({receiverId, senderId}).then(()=>{});
        });

        socket.on('ACCEPT_REQUEST', data =>{
            const {status, receiverId, senderId} = data;

            const config = {headers: {'content-type': 'application/json'}};

            axios.post('http://localhost:5000/friends/status', {senderId, receiverId}, config).then(response =>{
                if(status === response.data.status && status === 'Pending'){
                    FriendRequest.deleteOne({receiverId: receiverId, senderId: senderId}).then(()=>{});
                    FriendRequest.deleteOne({receiverId: senderId, senderId: receiverId}).then(()=>{});

                    User.findOne({_id: receiverId}).then(result =>{
                        const {friends} = result;

                        friends.push(senderId);

                        User.updateOne({_id: receiverId}, {friends}).then(()=>{});
                    });

                    User.findOne({_id: senderId}).then(result =>{
                        const {friends} = result;

                        friends.push(receiverId);

                        User.updateOne({_id: senderId}, {friends}).then(()=>{
                            io.sockets.to(active[senderId]).emit(
                                'ACCEPT_REQUEST',
                                {toastId: receiverId, type: 'REQUEST_ACCEPTED'}
                            );
                        });
                    });
                }
            });
        });

        socket.on('CHANGE_FRIEND_STATUS', data =>{
            const {status, senderId, receiverId} =data;

            const config = {headers: {'content-type': 'application/json'}};

            axios.post('http://localhost:5000/friends/status', {senderId, receiverId}, config).then(response =>{
                if(status === response.data.status){
                    if(status === 'Add Friend'){
                        User.findOne({_id: senderId}).then(result =>{
                            const {_id} = result;
            
                            const newFriendRequest = new FriendRequest({
                                senderId,
                                receiverId,
                                date: new Date(),
                                seen: false,
                                isRequestNew: true
                            });
            
                            newFriendRequest.save().then(() =>{
                                io.sockets.to(active[receiverId]).emit(
                                    'CHANGE_FRIEND_STATUS',
                                     {toastId: _id, type: 'FRIEND_REQUEST'}
                                );
                            });
                        });
                    }

                    else if(status === 'Pending'){
                        FriendRequest.deleteOne({receiverId, senderId}).then(()=>{});
                    }

                    else{
                        User.findOne({_id: receiverId}).then(result =>{
                            const {friends} = result;

                            for(let i=0;i<friends.length;i++){
                                if(friends[i] === senderId){
                                    friends.splice(i, 1);
                                    break;
                                }
                            }

                            User.updateOne({_id: receiverId}, {friends}).then(()=>{});
                        });

                        User.findOne({_id: senderId}).then(result =>{
                            const {friends} = result;

                            for(let i=0;i<friends.length;i++){
                                if(friends[i] === receiverId){
                                    friends.splice(i, 1);
                                    break;
                                }
                            }

                            User.updateOne({_id: senderId}, {friends}).then(()=>{});
                        });
                    }
                }
            });
        });
    });
}