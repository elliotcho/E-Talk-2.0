const initState = {
    composedTo: [],
    recipients: [],
    isSelected: {},
    chats: [],
    unseenChats: 0
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
                recipients: [],
                isSelected: {}
            }
        case 'UPDATE_RECIPIENTS':
            return{
                ...state,
                recipients: [...action.recipients],
                isSelected: {...action.isSelected}
            }
        case 'LOAD_CHATS':
            return{
                ...state,
                chats: [...action.chats]
            }
        case 'CLEAR_CHATS':
            return{
                ...state,
                chats: []
            }
        case 'LOAD_UNSEEN_CHATS':
            return{
                ...state,
                unseenChats: action.unseenChats
            }
        case 'SEE_CHATS':
            return{
                ...state,
                unseenChats: 0
            }
        default:
            return state;
    }
}

export default messagesReducer;