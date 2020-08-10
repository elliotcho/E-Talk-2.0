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

export const setMsgsOnDisplay = (chatId, uid) =>{
    return async (dispatch) => {
        const config = {headers: {'content-type': 'application/json'}};

        let response = await axios.post('http://localhost:5000/chats/messages/read', {chatId, uid}, config);
        const messages = response.data;

        response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        dispatch({type: 'DISPLAY_MESSAGES', messages, chats});
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

export const getUnseenChats = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/chats/unseen/${uid}`);
        const unseenChats= response.data.unseenChats;

        dispatch({type: 'LOAD_UNSEEN_CHATS', unseenChats});
    }
}

export const seeChats = (uid) =>{
    return async (dispatch) =>{
        await axios.put(`http://localhost:5000/chats/see/${uid}`);
        dispatch({type: 'SEE_CHATS'});
    }
}