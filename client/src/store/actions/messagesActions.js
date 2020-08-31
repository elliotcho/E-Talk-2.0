import axios from 'axios';

export const getUserChats = (uid) => {
    return async (dispatch) => {
        const response = await axios.get(`http://localhost:5000/chats/user/${uid}`);
        const chats = response.data;

        dispatch({
            type: 'SAVE_CHATS', 
            chats
        });

        return chats;
    }
}

export const seeChats = (uid) =>{
    return async (dispatch) =>{
        await axios.put(`http://localhost:5000/chats/see/${uid}`);
        
        dispatch({
            type: 'SEE_CHATS'
        });
    }
}

export const readChat = (chatId, uid, messages, isActive) =>{
    return async (dispatch, getState) => {
        if(isActive){
            const config = {headers: {'content-type': 'application/json'}};
            await axios.post('http://localhost:5000/chats/messages/read', {uid, chatId}, config);    
            
            const state = getState();
            const {chats} = state.messages;

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

        const n = messages.length;
        return messages[n-1].readBy.includes(uid);
    }
}

export const getChatPics = async (chatId, uid, getProfilePic) => {
     const config = {headers: {'content-type': 'application/json'}};

     const response = await axios.post('http://localhost:5000/chats/memberids', {uid, chatId}, config);
     const {members} = response.data;
    
     let chatPics = [];

     for(let i=0;i<members.length;i++){
         const imgURL = await getProfilePic(members[i]);
         chatPics.push(imgURL);
     }

     return chatPics;
}

export const getMemberNames = async (chatId, uid) => {
    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.post(`http://localhost:5000/chats/members`, {uid, chatId}, config);
    let {memberNames} = response.data;

    return memberNames;
}

export const getReadReceipts = async (readBy, uid, getProfilePic) => {
    const readReceipts = [];

    for(let i=0;i<readBy.length;i++){
        if(readBy[i] === uid){
                continue;
        }

        const imgURL = await getProfilePic(readBy[i]);

        readReceipts.push(imgURL);
    }

    return readReceipts;
}

export const sendMessage = async (chatId, uid, content) => {
    const config = {headers: {'content-type': 'application/json'}};

    const data = {
        uid,
        chatId, 
        content
    };

    const response = await axios.post('http://localhost:5000/chats/message', data, config);
    return response.data;
}

export const getMemberIds = async (chatId, uid) =>{
    const config = {headers: {'content-type': 'application/json'}};
    
    const data = {uid, chatId};

    const response = await axios.post('http://localhost:5000/chats/memberids', data, config);
    return response.data.members;
}

export const handleNewMessage = (newMessage, chatId, uid, io) =>{
    return (dispatch, getState) => {
        const state = getState();

        const {displayedChatId, msgsOnDisplay} = state.messages;

        if(displayedChatId === chatId){
            if(!newMessage.readBy.includes(uid)){
                newMessage.readBy.push(uid);
            }

            io.emit('READ_RECEIPTS', {
                chatId, 
                messages: [...msgsOnDisplay, newMessage]
            });

            dispatch({
                type: 'NEW_MESSAGE', 
                newMessage
            });
        }
    }
}


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



export const getUnseenChats = (uid) =>{
    return async (dispatch) =>{
        const response = await axios.get(`http://localhost:5000/chats/unseen/${uid}`);
        const unseenChats= response.data.unseenChats;

        dispatch({type: 'LOAD_UNSEEN_CHATS', unseenChats});
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

export const clearComposerChat = () =>{
    return (dispatch) =>{
        dispatch({type: 'CLEAR_COMPOSER_CHAT'});
    }
}