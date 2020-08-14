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
        let response = await axios.get(`http://localhost:5000/chats/messages/${chatId}`);
        const messages = response.data;
        const n = messages.length;

        for(let i=0;i<n;i++){
            if(messages[i].readBy.includes(uid)){
                continue;
            }

            messages[i].readBy.push(uid);
        }

        dispatch({type: 'DISPLAY_MESSAGES', messages});
    }
}

export const setDisplayedChatId = (chatId) =>{
    return (dispatch) =>{ 
        dispatch({type: 'SET_CHAT_ID', chatId});
    }
}

export const clearChatOnDisplay = () => {
    return (dispatch) =>{
        dispatch({type: 'CLEAR_DISPLAYED_CHAT'});
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

export const readChat = (chats, chatId, uid) =>{
    return (dispatch) => {
        for(let i=0;i<chats.length;i++){
            if(chats[i]._id === chatId){
                const {messages} = chats[i];
                const n = messages.length;

                messages[n-1].readBy.push(uid);

                break;
            }
        }

        dispatch({type: 'READ_CHAT', chats});
    }
}