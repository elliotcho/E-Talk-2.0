const {User, FriendRequest} = require('./dbschemas');
const axios = require('axios');

const {
    declineRequest,
    acceptRequest,
    changeFriendStatus
} = require('./socket/friends');

const active = {};

module.exports = (io) =>{
    io.on('connection', socket=>{
        socket.on('USER_AUTHENTICATED', data =>{
            active[data.uid] = socket.id;
        });
 
        socket.on('LOGOUT', data =>{ 
            delete active[data.uid];
        });

        socket.on('DECLINE_REQUEST', async data =>{
            await declineRequest(data);
        });

        socket.on('ACCEPT_REQUEST', async data =>{
            const response = await acceptRequest(data);

            const {senderId, receiverId} = data;

            if(response){
                io.sockets.to(active[senderId]).emit(
                    'ACCEPT_REQUEST',
                    {toastId: receiverId, uid: senderId, type: 'REQUEST_ACCEPTED'}
                );
            }
        });

        socket.on('CHANGE_FRIEND_STATUS', async data =>{
            const response = await changeFriendStatus(data);

            const {receiverId, senderId} = data;

            if(response){
                io.sockets.to(active[receiverId]).emit(
                    'CHANGE_FRIEND_STATUS',
                     {toastId: senderId, uid: receiverId, type: 'FRIEND_REQUEST'}
                );
            }
        });
    });
}