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
    sendMessage, 
    createChat,
    renderChat
} = require('./socket/chats');

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

        socket.on('SEARCH_COMPOSER', async data =>{
            const result = await getRecipients(data);

            const {uid} = data;

            io.sockets.to(active[uid]).emit(
                'SEARCH_COMPOSER', {queryResult: result}
            );
        });

        socket.on('CREATE_CHAT', async data =>{
            const result = await createChat(data);

            const newMessage = result[0];
            const chatId = result[1];
            const members = result[2];

            for(let i=0;i<members.length;i++){
                const id = members[i];

                const response = await axios.get(`http://localhost:5000/chats/user/${id}`);
                const chats= response.data;

                io.sockets.to(active[id]).emit('NEW_MESSAGE', {
                    chatId, 
                    newMessage, 
                    chats, 
                    uid: id
                });
            }
        });

        socket.on('SEND_MESSAGE', async data =>{
            const result = await sendMessage(data);

            const newMessage = result[0];
            const chatId = result[1];
            const members = result[2];

            for(let i=0;i<members.length;i++){
                const id = members[i];

                const response = await axios.get(`http://localhost:5000/chats/user/${id}`);
                const chats= response.data;

                io.sockets.to(active[id]).emit('NEW_MESSAGE', {
                    chatId, 
                    newMessage, 
                    chats, 
                    uid: id
                });
            }
        });

        socket.on('IS_TYPING', async data=>{
            const {chatId, uid} = data;

            const response = await axios.get(`http://localhost:5000/chats/${chatId}`);
            const chat = response.data;
            const {members} = chat;

            for(let i=0;i<members.length;i++){
                const id = members[i];
 
                io.sockets.to(active[id]).emit('IS_TYPING', {
                    uid, chatId, 
                });
            }
        });

        socket.on('STOP_TYPING', async data =>{
            const {chatId, typingMsgs} = data;

            const response = await axios.get(`http://localhost:5000/chats/${chatId}`);
            const chat = response.data;
            const {members} = chat;

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

        socket.on('RENDER_COMPOSER_CHAT', async data =>{
            const chatId = await renderChat(data);
            
            const {uid} = data;

            if(chatId){
                io.sockets.to(active[uid]).emit('RENDER_COMPOSER_CHAT', {
                    chatId
                });
            }
        });
    });
} 