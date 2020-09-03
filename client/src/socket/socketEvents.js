import React from 'react';
import * as messageActions from '../store/actions/messagesActions';
import {getUnreadRequests} from '../store/actions/friendsActions';
import {getUnreadNotifs} from '../store/actions/notificationActions';
import Toast from '../components/notifications/Toast';
import {toast} from 'react-toastify';

export const handleSocketEvents = (io, dispatch) =>{
    io.on('CHANGE_FRIEND_STATUS', data =>{
        const {uid} =data;

        dispatch(getUnreadRequests(uid));

        toast.info(<Toast data={data} msg={' sent you a friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('ACCEPT_REQUEST', data =>{
        const {uid} = data;

        dispatch(getUnreadNotifs(uid));

        toast.success(<Toast data={data} msg ={' accepted your friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false       
         });
    });

    io.on('LIKE_POST', data=>{
        const {uid, content} = data;

        dispatch(getUnreadNotifs(uid));

        toast.error(<Toast data={data} msg={` liked your post: ${content.substring(0,30)}...`}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('COMMENT_ON_POST', data =>{
        const {uid, content} = data;

        dispatch(getUnreadNotifs(uid));

        toast(<Toast data={data} msg={` commented on your: ${content.substring(0,30)}...`} color={'black'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('CREATE_CHAT', data =>{
        const {
            getUserChats,
            getUnseenChats
        } = messageActions;

        dispatch(getUserChats(data.uid));
        dispatch(getUnseenChats(data.uid));
    });

    io.on('NEW_MESSAGE', data =>{
        const {chatId, newMessage, uid} = data;

        const {
            getUnseenChats,
            renderNewMessage,
            getUserChats
        } = messageActions

        /* light up navbar if you're not on messages page
           re render the convo to include the new message
           reset message cards so that chat with chatId is now on top*/
        dispatch(getUnseenChats(uid));
        dispatch(renderNewMessage(chatId, newMessage));
        dispatch(getUserChats(uid));
    });

    io.on('IS_TYPING', data =>{
        const {chatId, uid} = data;
        const {handleTyping} = messageActions;

        dispatch(handleTyping(chatId, uid));
    });

    io.on('STOP_TYPING', data =>{
        const {chatId, typingMsgs} = data;
        const {stopTyping} = messageActions

        dispatch(stopTyping(chatId, typingMsgs));
    });

    io.on('READ_RECEIPTS', data => {
        const {
            chatId, 
            readerId
        } = data;

        const {handleReadReceipts} = messageActions

        dispatch(handleReadReceipts(chatId, readerId, io));
    });
}