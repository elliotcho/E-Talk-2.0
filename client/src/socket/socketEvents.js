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

        dispatch(getUnseenChats(data.uid));
        dispatch(getUserChats(data.uid));
    });

    io.on('NEW_MESSAGE', async data =>{
        const {chatId, newMessage, uid} = data;

        const {
            getUnseenChats,
            renderNewMessage,
            getUserChats,
            getMemberIds
        } = messageActions

        /* light up navbar if you're not on messages page
           re render the convo to include the new message
           reset message cards so that chat with chatId is now on top*/
        dispatch(getUnseenChats(uid));
        dispatch(renderNewMessage(chatId, newMessage, uid));
        dispatch(getUserChats(uid));

        //get the ids of all members except the user with uid
        const members = await getMemberIds(chatId, uid);

        io.emit('READ_RECEIPTS', {
            chatId,
            members,
            uid
        });
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
    
        dispatch(handleReadReceipts(chatId, readerId));
    });
}