import axios from 'axios';

export const getUnreadNotifs = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/notifs/unread/${uid}`).then(response =>{
            dispatch({type: 'LOAD_UNREAD_NOTIFS', unreadNotifs: response.data.unreadNotifs});
        });
    }
}

export const readNotifs = (uid) => {
    return (dispatch) =>{
        axios.put(`http://localhost:5000/notifs/read/${uid}`).then(response =>{
            dispatch({type: 'READ_NOTIFS', notifs: response.data});
        });
    }
}