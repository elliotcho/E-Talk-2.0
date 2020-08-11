const initState = {
    chats: [],
    recipients: [],
    composerResults: [],
    msgsOnDisplay: [],
    displayedChatId: null,
    unseenChats: 0
}

const messagesReducer = (state = initState, action) =>{
    switch (action.type){
        case 'SAVE_CHATS':
            return{
                ...state,
                chats: [...action.chats]
            }
        case 'COMPOSER_RESULTS':
            return{
                ...state,
                composerResults: [...action.composerResults]
            }
        case 'UPDATE_RECIPIENTS':
            return{
                ...state,
                recipients: [...action.recipients]
            }
        case 'CLEAR_COMPOSER':
            return{
                ...state,
                composerResults: [],
                recipients: []
            }
        case 'DISPLAY_MESSAGES':
            return{
                ...state,
                msgsOnDisplay: [...action.messages]
            }
        case 'SET_CHAT_ID':
            return{
                ...state,
                displayedChatId: action.chatId
            }
        case 'NEW_MESSAGE':
            if(state.displayedChatId === action.chatId){
                return{
                    ...state,
                    msgsOnDisplay: [...state.msgsOnDisplay, action.newMessage]
                }
            }
            
            return state;
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
        case 'READ_CHAT':
            return{
                ...state,
                chats: [...action.chats]
            }
        default:
            return state;
    }
}

export default messagesReducer;