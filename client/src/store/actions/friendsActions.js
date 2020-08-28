import * as types from '../constants/actionTypes';
import axios from 'axios';

export const getFriends = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/friends/${uid}`);

        dispatch({
            type: types.LOAD_FRIENDS,
            friends: response.data
        })
    }
}

export const getUnreadRequests = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/friends/unreadrequests/${uid}`);
        const {unreadRequests} = response.data;

        dispatch({
            type: types.LOAD_UNREAD_REQUESTS,
            unreadRequests
        });
    }
}

export const readRequests = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.put(`http://localhost:5000/friends/readrequests/${uid}`);
        const requests = response.data;

        dispatch({
            type: types.READ_REQUESTS,
            requests
        });
    }
}

export const removeRequest = (requestId) =>{
    return (dispatch, getState) =>{
        const state = getState();
        const {requests} = state.friends;

        for(let i=0;i<requests.length;i++){
            if(requests[i]._id === requestId){
                requests.splice(i, 1);
                break;
            }
        }

        dispatch({type: types.READ_REQUESTS, requests});
    }
}