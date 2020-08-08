import React from 'react';
import Toast from '../components/notifications/Toast';
import {toast} from 'react-toastify';

export const handleSocketEvents = 
    (
     io, 
     getUnreadRequests, 
     getUnreadNotifs, 
     getUsersComposedTo,
     addNewChat
    ) =>{
    
    io.on('CHANGE_FRIEND_STATUS', data =>{
        const {uid} =data;

        getUnreadRequests(uid);

        toast.info(<Toast data={data} msg={'sent you a friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('ACCEPT_REQUEST', data =>{
        const {uid} = data;

        getUnreadNotifs(uid);

        toast.success(<Toast data={data} msg ={'accepted your friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false       
         });
    });

    io.on('LIKE_POST', data=>{
        const {uid, content} = data;

        getUnreadNotifs(uid);

        toast.error(<Toast data={data} msg={`liked your post: ${content.substring(0,30)}...`}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('COMMENT_ON_POST', data =>{
        const {uid, content} = data;

        getUnreadNotifs(uid);

        toast(<Toast data={data} msg={`commented on your: ${content.substring(0,30)}...`} color={'black'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });

    io.on('COMPOSE_MESSAGE_TO', data => {
        getUsersComposedTo(data.queryResult);
    });

    io.on('NEW_MESSAGE', data =>{
      
    });
}