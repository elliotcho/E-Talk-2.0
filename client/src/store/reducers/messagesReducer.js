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
            case types.IS_TYPING:
            return{
                ...state,
                typingMsgs: [...state.typingMsgs, action.typingId]
            }     
        case types.STOP_TYPING:
            return{
                ...state,
                typingMsgs: [...action.typingMsgs]
            }
        case types.CLEAR_TYPING:
            return{
                ...state,
                typingMsgs: []
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
            return{
                ...state,
                msgsOnDisplay: [...state.msgsOnDisplay, action.newMessage]
            }
        case 'READ_RECEIPTS':
            return{
                ...state,
                msgsOnDisplay: [...action.msgsOnDisplay]
            }
        case 'CLEAR_DISPLAYED_CHAT':
            return{
                ...state,
                msgsOnDisplay: [],
                displayedChatId: null
            }
        default:
            return state;
    }
}

export default messagesReducer;