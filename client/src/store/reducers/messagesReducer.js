const initState = {
    composedTo: [],
    recipients: []
}

const messagesReducer = (state = initState, action) =>{
    switch (action.type){
        case 'GET_USERS_COMPOSED_TO':
            return{
                ...state,
                composedTo: [...action.composedTo]
            }
        case 'CLEAR_COMPOSER':
            return{
                ...state,
                composedTo: [],
                recipients: []
            }
        case 'UPDATE_RECIPIENTS':
            return{
                ...state,
                recipients: [...action.recipients]
            }
        default:
            return state;
    }
}

export default messagesReducer;