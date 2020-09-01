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
} = require('./socket/post');

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

        socket.on('CREATE_CHAT', async data =>{
            const {recipients} = data;

            for(let i=0;i<recipients.length;i++){
                const id = recipients[i]._id;

                io.sockets.to(active[id]).emit('CREATE_CHAT', {
                    uid: id
                });
            }
        });

        socket.on('SEND_MESSAGE', data =>{
            const {members, newMessage, chatId} = data;

            for(let i=0;i<members.length;i++){
                const uid = members[i];

                io.sockets.to(active[uid]).emit(
                    'NEW_MESSAGE', {chatId, newMessage, uid}
                );
            }
        });

        socket.on('IS_TYPING', async data=>{
            const {members, uid, chatId} = data;

            for(let i=0;i<members.length;i++){
                const id = members[i];
 
                io.sockets.to(active[id]).emit('IS_TYPING', {
                    uid, chatId
                });
            }
        });

        socket.on('STOP_TYPING', async data =>{
            const {chatId, typingMsgs, members} = data;

            for(let i=0;i<members.length;i++){
                const id = members[i];
 
                io.sockets.to(active[id]).emit('STOP_TYPING', {
                    typingMsgs, chatId
                });
            }
        });

        socket.on('READ_RECEIPTS', async data =>{
            const {chatId, messages} = data;

            const response = await axios.get(`http://localhost:5000/chats/${chatId}`);
            const chat = response.data;
            const {members} = chat;

            for(let i=0;i<members.length;i++){
                const id = members[i];
 
                io.sockets.to(active[id]).emit('READ_RECEIPTS', {
                    messages, chatId
                });
            }
        });
    });
} 