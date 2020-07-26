import React from 'react';
import FriendRequestToast from '../components/toasts/FriendRequestToast';
import {toast} from 'react-toastify';

export const handleSocketEvents = (io) =>{
    io.on('CHANGE_FRIEND_STATUS', data =>{
        toast.info(<FriendRequestToast data = {data}/>, {
            position: toast.POSITION.BOTTOM_RIGHT,
            draggable: false,
            closeOnClick: false,
        });
    });

    io.on('ACCEPT_REQUEST', data =>{
        toast.info("Friend request accepted");
    });
}