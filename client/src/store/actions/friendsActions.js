import axios from 'axios';

export const getFriends = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/${uid}`).then(response =>{
            dispatch({type: 'LOAD_FRIENDS', friends: response.data});
        });
    }
}

export const getUnreadRequests = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/unreadrequests/${uid}`).then(response =>{
            dispatch({type: 'LOAD_UNREAD_REQUESTS', unreadRequests: response.data.unreadRequests});
        });
    }
}

export const readRequests = (uid) =>{
    return (dispatch) =>{
        axios.put(`http://localhost:5000/friends/readrequests/${uid}`).then(response =>{
            dispatch({type: 'READ_REQUESTS', requests: response.data});
        });
    }
}

export const removeRequest = (requestId, requests) =>{
    return (dispatch) =>{
        for(let i=0;i<requests.length;i++){
            if(requests[i]._id === requestId){
                requests.splice(i, 1);
                break;
            }
        }

        dispatch({type: 'REMOVE_REQUEST', requests});
    }
}