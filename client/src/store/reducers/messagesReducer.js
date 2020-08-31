const initState = {
    chats: [],
    unseenChats: 0,
    recipients: [],
    composerResults: [],
    msgsOnDisplay: [],
    displayedChatId: null,
    typingMsgs: [],
    composerChatId: null
}

const messagesReducer = (state = initState, action) =>{
    switch (action.type){
        case 'SAVE_CHATS':
            return{
                ...state,
                chats: [...action.chats]
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
            const {messages, chatId, io} = action;
            
            io.emit('READ_RECEIPTS', {
                chatId, 
                messages: [...messages]
            });
            
            return{
                ...state,
                msgsOnDisplay: [...messages]
            }
        case 'SET_CHAT_ID':
            return{
                ...state,
                displayedChatId: action.chatId
            }
        case 'CLEAR_DISPLAYED_CHAT':
            return{
                ...state,
                msgsOnDisplay: [],
                displayedChatId: null
            }
        case 'NEW_MESSAGE':
            return{
                ...state,
                msgsOnDisplay: [...state.msgsOnDisplay, action.newMessage]
            }
        case 'LOAD_UNSEEN_CHATS':
            return{
                ...state,
                unseenChats: action.unseenChats
            }
        case 'IS_TYPING':
            if(state.displayedChatId === action.chatId){
                const {typingMsgs} = state;

                const {typingId, msg} = action;

                return{
                    ...state,
                    typingMsgs: [...typingMsgs, {typingId, msg}]
                }
            }

            return state;
        case 'STOP_TYPING':
            if(state.displayedChatId === action.chatId){
                return{
                    ...state,
                    typingMsgs: [...action.typingMsgs]
                }
            }

            return state;
        case 'CLEAR_TYPING':
            return{
                ...state,
                typingMsgs: []
            }
        case 'READ_RECEIPTS':
            if(state.displayedChatId === action.chatId){
                const {messages} = action;

                return{
                    ...state,
                    msgsOnDisplay: [...messages]
                }
            }

            return state;
        
        case 'RENDER_COMPOSER_CHAT':
            return{
                ...state,
                composerChatId: action.chatId
            }
        case 'CLEAR_COMPOSER_CHAT':
            return{
                ...state,
                composerChatId: null
            }
        default:
            return state;
    }
}

export default messagesReducer;