import axios from 'axios';

export const getRequests = (uid) =>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/friends/requests/${uid}`).then(response =>{
            dispatch({type: 'LOAD_REQUESTS', requests: response.data});
        });
    }
}