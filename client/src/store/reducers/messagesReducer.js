const initState = {composedTo: []}

const messagesReducer = (state = initState, action) =>{
    switch (action.type){
        case 'GET_USERS_COMPOSED_TO':
            return{
                ...state,
                composedTo: [...action.composedTo]
            }
        case 'CLEAR_USERS_COMPOSED_TO':
            return{
                ...state,
                composedTo: []
            }
        default:
            return state;
    }
}

export default messagesReducer;