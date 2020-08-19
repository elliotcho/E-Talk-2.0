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

export const setMsgsOnDisplay = (chatId, uid, io) =>{
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

        dispatch({type: 'DISPLAY_MESSAGES', messages, chatId, io});
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

export const handleNewMessage = (newMessage, chatId, uid, io) =>{
    return (dispatch) => {
        dispatch({type: 'NEW_MESSAGE', newMessage, chatId, uid, io});
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

        dispatch({type: 'READ_CHAT', chats, chatId, uid});
    }
}

export const handleTyping = (chatId, typingId) =>{
    return async (dispatch) =>{
        const user = await axios.get(`http://localhost:5000/users/${typingId}`);
        const {firstName, lastName} = user.data;
        
        const msg = `${firstName} ${lastName} is typing...`;

        dispatch({type: 'IS_TYPING', chatId, msg, typingId});
    }
}

export const stopTyping = (chatId, typingMsgs) =>{
    return (dispatch) =>{
        dispatch({type: 'STOP_TYPING', typingMsgs, chatId});
    }
}

export const clearTyping = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_TYPING'});
    }
}

export const handleReadReceipts = (chatId, messages) =>{
    return (dispatch) =>{
        dispatch({type: 'READ_RECEIPTS', chatId, messages});
    }
}

export const renderComposerChat = (chatId) =>{
  return (dispatch) =>{
      dispatch({type: 'RENDER_COMPOSER_CHAT', chatId});
  }
}