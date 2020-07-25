const {User, FriendRequest} = require('./dbschemas');

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
            const {requestId} = data;

            FriendRequest.deleteOne({_id: requestId}).then(()=>{});
        });

        socket.on('ACCEPT_REQUEST', data =>{
            const {requestId, receiverId, senderId} = data;

            FriendRequest.deleteOne({_id: requestId}).then(()=>{});

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
                         {newFriendId: receiverId}
                    );
                });
            });
        });

        socket.on('FRIEND_REQUEST', data =>{
            const {senderId, receiverId} =data;

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
                        'FRIEND_REQUEST',
                         {_id}
                    );
                });
            });
        });
    });
}