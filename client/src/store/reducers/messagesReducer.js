import * as types from '../constants/actionTypes';

const initState = {
    composerResults: [],
    recipients: [],
    composerChatId: null,
    chats: [],
    unseenChats: 0,
    msgsOnDisplay: [],
    displayedChatId: null,
    typingMsgs: []
}

const messagesReducer = (state = initState, action) =>{
    switch (action.type){
        case types.LOAD_COMPOSER_RESULTS:
            return{
                ...state,
                composerResults: [...action.composerResults]
            }
        case types.UPDATE_RECIPIENTS:
            return{
                ...state,
                recipients: [...action.recipients]
            }
        case types.RENDER_COMPOSER_CHAT:
            return{
                ...state,
                composerChatId: action.chatId
            }
        case types.CLEAR_COMPOSER_CHAT:
            return{
                ...state,
                composerChatId: null
            }
        case types.CLEAR_COMPOSER:
            return{
                ...state,
                composerResults: [],
                recipients: [],
                composerChatId: null
        }
        case types.READ_CHAT:
            return{
                ...state,
                chats: [...action.chats]
            }
        case types.LOAD_CHATS:
            return{
                ...state,
                chats: [...action.chats]
            }
        case types.SEE_CHATS:
            return{
                ...state,
                unseenChats: 0
            }

        case types.CLEAR_CHATS:   
            return{
                ...state,
                chats: []
            }
        case types.LOAD_UNSEEN_CHATS:
            return{
                ...state,
                unseenChats: action.unseenChats
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
        default:
            return state;
    }
}

export default messagesReducer;