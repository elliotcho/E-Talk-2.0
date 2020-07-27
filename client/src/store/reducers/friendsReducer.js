const initState = {requests: [], friends: [], unreadRequests: 0}

const friendsReducer = (state = initState, action) =>{
    switch (action.type){
        case "LOAD_FRIENDS":
            return{
                ...state,
                friends: [...action.friends]
            }
        case "LOAD_REQUESTS":
            return {
                ...state,
                requests: [...action.requests]
            }
        case "REMOVE_REQUEST":
            return {
                ...state,
                requests: [...action.requests]
            }
        case "LOAD_UNREAD":
            return{
                ...state,
                unreadRequests: action.unreadRequests
            }
        default:
            return state;
    }
}

export default friendsReducer;