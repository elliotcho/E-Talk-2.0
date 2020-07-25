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

            FriendRequest.deleteOne({_id: requestId}).then(()=>{
                console.log(`Request with id ${requestId} has been removed`);
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