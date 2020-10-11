const active = {};

module.exports = (io) =>{
    io.on('connection', socket=>{
        socket.on('USER_AUTHENTICATED', data =>{
            active[data.uid] = socket.id;
        });
 
        socket.on('LOGOUT', data =>{ 
            delete active[data.uid];
        });

        socket.on('ACCEPT_REQUEST', async data =>{
            const {receiverId, senderId} = data;

            io.sockets.to(active[senderId]).emit('ACCEPT_REQUEST',{
                type: 'REQUEST_ACCEPTED',
                toastId: receiverId, 
                uid: senderId, 
            });
            
        });

        socket.on('CHANGE_FRIEND_STATUS', async data =>{
            const {receiverId, senderId, msg} = data;

            if(msg){
                io.sockets.to(active[receiverId]).emit('CHANGE_FRIEND_STATUS',{
                    toastId: senderId, 
                    uid: receiverId, 
                    type: 'FRIEND_REQUEST'
                });
            }
        });

        socket.on('LIKE_POST', async data =>{
           const {receiverId, senderId, content} = data;

            if(receiverId){
                io.sockets.to(active[receiverId]).emit('LIKE_POST',{
                    toastId: senderId, 
                    uid: receiverId, 
                    content
                });
            }
        });

        socket.on('COMMENT_ON_POST', async data=>{
            const {receiverId, senderId, content} = data;

            if(receiverId){
                io.sockets.to(active[receiverId]).emit('COMMENT_ON_POST', {
                    toastId: senderId, 
                    uid: receiverId, 
                    content
                });
            }
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

        socket.on('NEW_MESSAGE', data =>{
            const {members, newMessage, chatId} = data;

            for(let i=0;i<members.length;i++){
                const uid = members[i];

                io.sockets.to(active[uid]).emit('NEW_MESSAGE', {
                    chatId, 
                    newMessage, 
                    uid
                });
            }
        });

        socket.on('IS_TYPING', data=>{
            const {members, uid, chatId} = data;

            for(let i=0;i<members.length;i++){
                const id = members[i];
 
                io.sockets.to(active[id]).emit('IS_TYPING', {
                    uid, 
                    chatId
                });
            }
        });

        socket.on('STOP_TYPING', data =>{
            const {chatId, typingMsgs, members} = data;

            for(let i=0;i<members.length;i++){
                const id = members[i];
 
                io.sockets.to(active[id]).emit('STOP_TYPING', {
                    typingMsgs, 
                    chatId
                });
            }
        });

        socket.on('READ_RECEIPTS', data =>{
            const {chatId, members, uid} = data;

            for(let i=0;i<members.length;i++){
                const id = members[i];

                io.sockets.to(active[id]).emit('READ_RECEIPTS', {
                    chatId,
                    readerId: uid
                });
            }
        });
    });
} 