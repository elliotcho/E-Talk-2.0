import {useToasts} from 'react-toast-notifications';

export const handleSocketEvents = (io) =>{
    io.on('FRIEND_REQUEST', data =>{
        alert(data.msg)
    });
}