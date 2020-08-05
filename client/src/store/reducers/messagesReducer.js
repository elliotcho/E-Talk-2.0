const initState = {composedTo: []}

const messagesReducer = (state = initState, action) =>{
    switch (action.type){
        case 'GET_USERS_COMPOSED_TO':
            return{
                ...state,
                composedTo: [...action.composedTo]
            }
        default:
            return state;
    }
}

export default messagesReducer;