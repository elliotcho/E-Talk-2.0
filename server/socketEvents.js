const {User} = require('./dbschemas');

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
                const msg= `${result.firstName} ${result.lastName} sent you a friend request`;

                io.sockets.to(active[receiverId]).emit(
                    'FRIEND_REQUEST',
                     {msg}
                );
            });
        });
    });
}