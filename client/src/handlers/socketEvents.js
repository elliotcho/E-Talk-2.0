import React from 'react';
import Toast from '../components/notifications/Toast';
import {toast} from 'react-toastify';

export const handleSocketEvents = (io) =>{
    io.on('CHANGE_FRIEND_STATUS', data =>{
        toast.info(<Toast data={data} msg={'sent you a friend request!'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false,
            closeOnClick: false,
        });
    });

    io.on('ACCEPT_REQUEST', data =>{
        toast.success(<Toast data={data} msg ={'accepted your friend request'}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false,
            closeOnClick: false
        });
    });
}