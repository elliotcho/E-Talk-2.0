import React from 'react';
import Toast from '../components/notifications/Toast';
import {toast} from 'react-toastify';

export const handleSocketEvents = (io, getUnreadRequests, getUnreadNotifs) =>{
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
        const {uid} = data;

        getUnreadNotifs(uid);

        toast.error(<Toast data={data} msg={'liked your post!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false
        });
    });
}