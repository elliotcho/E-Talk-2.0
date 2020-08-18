import React from 'react';
import Toast from '../components/notifications/Toast';
import {toast} from 'react-toastify';

export const handleSocketEvents = 
    (
     io, 
     getUnreadRequests, 
     getUnreadNotifs,
     setComposerResults,
     setUserChats,
     handleNewMessage,
     getUnseenChats,
     handleTyping,
     stopTyping,
     handleReadReceipts
    ) =>{
    
    io.on('CHANGE_FRIEND_STATUS', data =>{
        const {uid} =data;

        getUnreadRequests(uid);

        toast.info(<Toast data={data} msg={' sent you a friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('ACCEPT_REQUEST', data =>{
        const {uid} = data;

        getUnreadNotifs(uid);

        toast.success(<Toast data={data} msg ={' accepted your friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false       
         });
    });

    io.on('LIKE_POST', data=>{
        const {uid, content} = data;

        getUnreadNotifs(uid);

        toast.error(<Toast data={data} msg={` liked your post: ${content.substring(0,30)}...`}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('COMMENT_ON_POST', data =>{
        const {uid, content} = data;

        getUnreadNotifs(uid);

        toast(<Toast data={data} msg={` commented on your: ${content.substring(0,30)}...`} color={'black'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('SEARCH_COMPOSER', data =>{
        setComposerResults(data.queryResult);
    });

    io.on('CREATE_CHAT', data =>{
        setUserChats(data.chats);
    });

    io.on('NEW_MESSAGE', data =>{
        const {chatId, newMessage, chats, uid} = data;

        //light up navbar if you're not on messages page
        getUnseenChats(uid)

        //re render the convo to include the new message
        handleNewMessage(newMessage, chatId, uid, io);

        //reset message cards so that chat with chatId is now on top
        setUserChats(chats);
    });

    io.on('IS_TYPING', data =>{
        const {chatId, uid} = data;

        handleTyping(chatId, uid);
    });

    io.on('STOP_TYPING', data =>{
        const {chatId, typingMsgs} = data;

        stopTyping(chatId, typingMsgs);
    });

    io.on('READ_RECEIPTS', data => {
        const {chatId, messages} = data;

        handleReadReceipts(chatId, messages);
    });
}