const {
    declineRequest,
    acceptRequest,
    changeFriendStatus
} = require('./socket/friends');

const {
    likePost,
    unlikePost,
    addComment,
    removeComment
} = require('./socket/posts');

const {
    getRecipients,
    createChat
} = require('./socket/messages');

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

        socket.on('LIKE_POST', async data =>{
            const postInfo = await likePost(data);

            const receiverId = postInfo[0];
            const content = postInfo[1];

            const {senderId} = data;

            if(receiverId){
                io.sockets.to(active[receiverId]).emit(
                    'LIKE_POST',
                    {toastId: senderId, uid: receiverId, content}
                );
            }
        });

        socket.on('UNLIKE_POST', async data =>{
            await unlikePost(data);
        });

        socket.on('COMMENT_ON_POST', async data=>{
            const postInfo = await addComment(data);

            const receiverId = postInfo[0];
            const content = postInfo[1];

            const {senderId} = data;

            if(receiverId){
                io.sockets.to(active[receiverId]).emit(
                    'COMMENT_ON_POST', 
                    {toastId: senderId, uid: receiverId, content}
                );
            }
        });

        socket.on('REMOVE_COMMENT', async data =>{
            await removeComment(data);
        });

        socket.on('COMPOSE_MESSAGE_TO', async data =>{
            const result = await getRecipients(data);

            const {uid} = data;

            io.sockets.to(active[uid]).emit(
                'COMPOSE_MESSAGE_TO',
                {queryResult: result}
            );
        });

        socket.on('CREATE_CHAT', async data=>{
          
        });
    });
}