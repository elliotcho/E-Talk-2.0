import axios from 'axios';

export const getUnreadNotifs = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/notifs/unread/${uid}`);
        const {unreadNotifs} = response.data;

        dispatch({
            type: 'LOAD_UNREAD_NOTIFS', 
            unreadNotifs
        });
    }
}

export const readNotifs = (uid) => {
    return async (dispatch) =>{
        const response = await axios.put(`http://localhost:5000/notifs/read/${uid}`);

        dispatch({
            type: 'READ_NOTIFS',
            notifs: response.data
        });
    }
}