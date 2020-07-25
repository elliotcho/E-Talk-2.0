const initState = {requests: [], friends: []}

const friendsReducer = (state = initState, action) =>{
    switch (action.type){
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
        default:
            return state;
    }
}

export default friendsReducer;