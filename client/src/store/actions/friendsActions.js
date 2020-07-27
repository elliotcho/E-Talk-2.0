import axios from 'axios';

export const getFriends = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/${uid}`).then(response =>{
            dispatch({type: 'LOAD_FRIENDS', friends: response.data});
        });
    }
}

export const getRequests = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/requests/${uid}`).then(response =>{
            dispatch({type: 'LOAD_REQUESTS', requests: response.data});
        });
    }
}

export const getUnreadRequests = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/unreadrequests/${uid}`).then(response =>{
            dispatch({type: 'LOAD_UNREAD', unreadRequests: response.data.unreadRequests});
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