import {
    LOAD_FRIENDS,
    READ_REQUESTS,
    LOAD_UNREAD_REQUESTS,
    REMOVE_REQUEST
} from '../constants/actionTypes';

const initState = {
    requests: [], 
    friends: [], 
    unreadRequests: 0
}

const friendsReducer = (state = initState, action) =>{
    switch (action.type){
        case LOAD_FRIENDS:
            return{
                ...state,
                friends: [...action.friends]
            }
        case READ_REQUESTS:
            return{
                ...state,
                unreadRequests: 0,
                requests: [...action.requests]
            }
        case LOAD_UNREAD_REQUESTS:
            return{
                ...state,
                unreadRequests: action.unreadRequests
            }
        case REMOVE_REQUEST:
            return {
                ...state,
                requests: [...action.requests]
            }
        default:
            return state;
    }
}

export default friendsReducer;