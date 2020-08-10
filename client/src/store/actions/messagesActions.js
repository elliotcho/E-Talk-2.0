import axios from 'axios';

export const setUserChats = (chats) =>{
    return (dispatch) =>{
        dispatch({type: 'SAVE_CHATS', chats});
    }
}

export const setComposerResults = (results) =>{
    return (dispatch) =>{
        dispatch({type: 'COMPOSER_RESULTS', composerResults: results});
    }
}

export const updateRecipients = (recipients) =>{
    return(dispatch) =>{
        dispatch({type: 'UPDATE_RECIPIENTS', recipients});
    }
}

export const clearComposer = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_COMPOSER'});
    }
}

export const setMsgsOnDisplay = (chatId) =>{
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;

        dispatch({type: 'DISPLAY_MESSAGES', messages});
    }
}

export const setDisplayedChatId = (chatId) =>{
    return (dispatch) =>{ 
        dispatch({type: 'SET_CHAT_ID', chatId});
    }
}

export const handleNewMessage = (newMessage, chatId) =>{
    return (dispatch) => {
        dispatch({type: 'NEW_MESSAGE', chatId, newMessage});
    }
}