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

        socket.on('FRIEND_REQUEST', data =>{
            const {senderId, receiverId} =data;

            User.findOne({_id: senderId}).then(result =>{
                const {firstName, lastName} = result;

                const newFriendRequest = new FriendRequest({
                    senderId,
                    receiverId,
                    date: new Date(),
                    content: 'sent you a friend request',
                    seen: false,
                    isRequestNew: true
                });

                newFriendRequest.save().then(() =>{
                    io.sockets.to(active[receiverId]).emit(
                        'FRIEND_REQUEST',
                         {firstName, lastName, msg: 'sent you a friend request'}
                    );
                });
            });
        });
    });
}